const movers = [];

const moversLimit = 10;

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    smooth();
    for (let i = 0; i < moversLimit; i++) {
        movers[i] = new Mover();
    }
    canvas.mouseReleased(function() {
        movers.forEach(function(m) {
            m.setMousePosition();
        });
    })
}

function draw() {
    background(255);

    for (let i = 0; i < movers.length; i++) {
        const mover = movers[i];
        mover.update();
        mover.checkEdges();
        mover.display();
    }
}