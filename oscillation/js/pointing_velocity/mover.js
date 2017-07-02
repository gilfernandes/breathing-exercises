function Mover() {
    this.location = createVector(width / 2 + random(-50, 50), height / 2 + random(-50, 50));
    this.velocity = createVector(0, 0);
    this.r = 16;
    this.topspeed = 4;
    this.xoff = 1000;
    this.yoff = 0;
}

Mover.prototype.update = function() {
    const mouse = createVector(mouseX, mouseY);
    const dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
};

Mover.prototype.display = function() {
    const theta = this.velocity.heading();
    stroke(0);
    strokeWeight(2);
    fill(127);
    push();
    rectMode(CENTER);
    translate(this.location.x, this.location.y);
    rotate(theta);
    rect(0, 0, 30, 10);
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