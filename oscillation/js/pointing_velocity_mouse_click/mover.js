
const max = 2 * Math.PI; // 360 degrees
const oscillationStep = Math.PI / 180;
const imgPathLeft = "../forces/assets/images/bee-small.png";
const imgPathRight = "../forces/assets/images/bee-small_right.png";

function Mover() {
    this.location = createVector(width / 2 + random(-50, 50), height / 2 + random(-50, 50));
    this.velocity = createVector(0, 0);
    this.r = 16;
    this.topspeed = 4;
    this.xoff = 1000;
    this.yoff = 0;
    this.mouseX = null;
    this.mouseY = null;
    this.oscillationX = random(0, max);
    this.oscillationY = random(0, max);
    this.spriteLeft = new Sprite(imgPathLeft);
    this.spriteRight = new Sprite(imgPathRight);
    this.sprite = this.spriteLeft;
    this.extraRotation = Math.PI;
}

Mover.prototype.applyRandomForce = function() {
    this.oscillationX += oscillationStep;
    this.oscillationX += oscillationStep;
    this.location.x += sin(this.oscillationX);
    this.location.y += cos(this.oscillationY);
};

Mover.prototype.update = function() {
    const mouse = createVector(this.mouseX, this.mouseY);
    const dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
    this.applyRandomForce();
};

Mover.prototype.setMousePosition = function () {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    if(this.location.x > this.mouseX) {
        this.extraRotation = Math.PI;
        this.sprite = this.spriteLeft;
    }
    else {
        this.extraRotation = 0;
        this.sprite = this.spriteRight;
    }
};

Mover.prototype.display = function() {
    const heading = this.velocity.heading();
    const theta = heading + this.extraRotation;
    stroke(0);
    strokeWeight(2);
    fill(127);
    push();
    rectMode(CENTER);
    translate(this.location.x, this.location.y);
    rotate(theta);
    this.sprite.draw(0, 0, this.sprite.sprite.width, this.sprite.sprite.height);
    pop();
};

Mover.prototype.checkEdges = function() {
    if (this.location.x > width) {
        this.location.x = 0;
    }
    else if (this.location.x < 0) {
        this.location.x = width;
    }

    if (this.location.y > height) {
        this.location.y = 0;
    }
    else if (this.location.y < 0) {
        this.location.y = height;
    }
};