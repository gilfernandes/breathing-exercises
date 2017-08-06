let r;
let theta;
let dir = 1;

function setup() {
    let canvas = createCanvas(window.innerWidth * 0.5, window.innerHeight * 0.8);
    smooth();

    // Initialize all values
    r = 1;
    theta = 0;
}

function draw() {

    background(255);

    // Translate the origin point to the center of the screen
    translate(width/2, height/2);

    // Convert polar to cartesian
    r += 0.5 * dir;
    (function switchDir() {
        if(r > width / 2) {
            dir = -1;
        }
        else if(r < 0) {
            dir = 1;
        }
    }());
    let x = r * cos(theta);
    let y = r * sin(theta);

    // Draw the ellipse at the cartesian coordinate
    ellipseMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    line(0,0,x,y);
    ellipse(x, y, 48, 48);

    // Increase the angle over time
    theta += 0.02;
}



