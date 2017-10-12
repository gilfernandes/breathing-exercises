let img;
let ct;
let imgWidth;
let imgHeight;

function preload() {
    img = loadImage("../forces/assets/images/cake.png")
}

function setup() {
    let canvas = createCanvas(500, 500);
    reset();
}

function reset() {
    ct = 0;
    imgWidth = 1;
    imgHeight = 1;
}

function draw() {
    background(255);
    //this makes the image spiral
    image(img, 125 + cos(ct) * frameCount / 10, 175 + sin(ct) * frameCount / 10, imgWidth, imgHeight);
    // ellipse(125 + cos(ct) * frameCount / 10, 175 + sin(ct) * frameCount / 10, 5);
    ct += 0.15;
    imgWidth += 0.2;
    imgHeight += 0.2;
    if(imgWidth > width / 3) {
        // reset
        reset();
    }
}