let movers = [];

const numMovers = 40;

const G = 0.4;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for(let i = 0; i < numMovers; i++) {
        movers[i] = new Mover(createVector(random(width), random(height)), random(0.1,2));
    }
}

function draw() {
    background(255);
    for (let i = 0; i < movers.length; i++) {
        for (let j = 0; j < movers.length; j++) {
            if (i !== j) {
                let force = movers[j].attract(movers[i]);
                movers[i].applyForce(force);
            }
        }
        movers[i].update();
        movers[i].display();
    }
}