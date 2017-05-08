let movers;

let liquid;

function setup() {

    movers = [];
    const images = ["assets/images/cake.png", "assets/images/bee-small.png"];
    for(let i = 0; i < 50; i++) {
        movers.push(new Mover(window.innerWidth, window.innerHeight, new Sprite(images[i % 2]), random(2, 10)));
    }
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.mousePressed(function() {
        movers.push(new Mover(window.innerWidth, window.innerHeight, new Sprite(images[0]), random(2, 10), createVector(mouseX, mouseY)));
    });
    liquid = new Liquid(0, height / 2, width, height / 2, 0.1, color(145));
}

function draw() {
    background(255);

    liquid.display();

    for (let i = 0; i < movers.length; i++) {
        const mover = movers[i];
        if (mover.isInside(liquid)) {
            mover.drag(liquid);
        }
        let m = 0.1 * mover.mass;
        let gravity = createVector(0, m);
        mover.applyForce(gravity);

        mover.move();
        mover.draw();
        mover.checkEdges();
    }
}