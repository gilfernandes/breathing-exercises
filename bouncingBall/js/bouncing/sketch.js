let movers;

const quantityMovers = 50;

function setup() {

    movers = [];
    const images = ["assets/images/cake.png", "assets/images/bee-small.png"];
    for(let i = 0; i < quantityMovers; i++) {
        movers.push(new Mover(window.innerWidth, window.innerHeight, new Sprite(images[i % 2])));
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