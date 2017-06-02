
let batons = [];

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);

    function randomPos() {
        return floor(random(-height / 3, height / 3));
    }

    for(let i = 0; i < 100; i++) {
        batons[i] = new Baton(createVector(0, 0), 0.0000000001, random(0.0001, 0.0002), 10, createVector(randomPos(), randomPos()));
    }
}

function draw() {
    background(255);
    for(let i = 0; i < batons.length; i++) {
        let baton = batons[i];
        baton.move();
        baton.display();
    }
}