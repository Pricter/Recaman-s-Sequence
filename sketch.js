let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

let arcs = []
let biggest = 0;

class Arc {
    constructor(start, end, dir) {
        this.start = start;
        this.end = end;
        this.dir = dir;
    }

    show() {
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2
        stroke(255);
        strokeWeight(0.1);
        noFill();
        if(this.dir == 0) {
            arc(x, 0, diameter, diameter, PI, 0);
        } else {
            arc(x, 0, diameter, diameter, 0, PI);
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    numbers[index] = true;
    sequence.push(index);
}

function step() {
    let next = index - count;
    if(next < 0 || numbers[next]) {
        next = index + count;
    }
    numbers[next] = true;
    sequence.push(next);

    let a = new Arc(index, next, count % 2);
    arcs.push(a);

    index = next;

    if(index > biggest) {
        biggest = index;
    }

    count++;
}

function draw() {
    background(0)
    translate(0, height / 2);
    scale(width / biggest);
    if(sequence > 10000) {
        sequence.shift();
    }
    if(numbers > 10000) {
        numbers.shift();
    }

    step();

    for(let a of arcs) {
        a.show();
    }
    // console.log(index)
}
