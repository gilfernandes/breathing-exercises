let movers;

const quantityMovers = 47;

let cake;

function setup() {

    movers = [];
    cake = loadImage("assets/images/cake.png");
    for(let i = 0; i < quantityMovers; i++) {
        movers.push(new Mover(window.innerWidth, window.innerHeight));
    }
    createCanvas(window.innerWidth, window.innerHeight);

}

function draw() {
    background(255);
    for(let i = 0; i < quantityMovers; i++) {
        const mover = movers[i];
        mover.move();
        mover.draw();
    }
}