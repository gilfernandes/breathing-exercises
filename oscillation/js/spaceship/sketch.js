let ship;

function setup() {
    let canvas = createCanvas(window.innerWidth * 0.5, window.innerHeight * 0.8);
    smooth();

    // Initialize all values
    ship = new Spaceship();
}

function draw() {

    background(255);

    // Update location
    ship.update();

    // Wrap edges
    ship.wrapEdges();

    // Draw ship
    ship.display();

    fill(0);

    if (keyIsDown(LEFT_ARROW)) {
        ship.turn(-0.03);
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        ship.turn(0.03);
    }
    else if (keyIsDown(UP_ARROW)) {
         ship.thrust();
    }
}



