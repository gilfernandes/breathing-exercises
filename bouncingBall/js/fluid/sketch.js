let movers;

let liquid;

let pressedMouse = false;

const imagePath = "assets/images/flowers";

const images = ["bouquet_red.png", "bouquet_red_roses.png", "bouquet_yellow.png", "white_red_bouquet.png"];

const amountOfImages = 30;

function setup() {

    movers = [];
    for(let i = 0; i < amountOfImages; i++) {
        const image = imagePath + "/" + images[i % images.length];
        movers.push(new Mover(window.innerWidth, window.innerHeight, new Sprite(image), random(2, 10)));
    }
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    liquid = new Liquid(0, height / 2, width, height / 2, 0.1, color(145));
    canvas.mousePressed(function() {
        pressedMouse = true;
        const mouseVec = createVector(mouseX, mouseY);
        if(!liquid.isInside(mouseVec)) {
            let rand = int(random(images.length));
            movers.push(new Mover(window.innerWidth, window.innerHeight, new Sprite(imagePath + "/" + images[rand]), random(2, 10), mouseVec));
        }
    });
    canvas.mouseReleased(function () {
        pressedMouse = false;
    });
    imageMode(CENTER);
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