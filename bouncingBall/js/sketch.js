let movers;

const quantityMovers = 50;

let cake;

function setup() {

    movers = [];
    cake = loadImage("assets/images/cake.png");
    for(let i = 0; i < quantityMovers; i++) {
        movers.push(new Mover(window.innerWidth, window.innerHeight));
    }
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.mouseMoved(function () {
        let mouse = createVector(mouseX, mouseY);
        movers.forEach(function(m) {
            m.mouse = mouse;
        });
    });
}

function draw() {
    background(255);
    for(let i = 0; i < quantityMovers; i++) {
        const mover = movers[i];
        mover.move();
        mover.draw();
    }
}