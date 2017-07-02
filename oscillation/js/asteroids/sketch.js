const movers = [];

let a;

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    for (let i = 0; i < 20; i++) {
        movers.push(new Mover(random(0.1,2), random(width),random(height)));
    }
    a = new Attractor(10, createVector(width / 2, height / 2));
}

function draw() {
    background(255);
    rectMode(CORNER);
    noStroke();
    fill(255,5);
    rect(0,0,width,height);
    a.display();
    movers.forEach(function(mover) {
        const force = a.attract(mover);
        mover.applyForce(force);

        mover.update();
        mover.display();
    });
}