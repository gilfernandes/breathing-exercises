function Spaceship() {
    this.location = createVector(width / 2, height / 2);
    this.velocity = createVector(0.0, 0.0);
    this.acceleration = createVector(0.0, 0.0);
    this.damping = 0.995;
    this.topspeed = 6;
    this.heading = 0;
    this.r = 16;
    this.thrusting = false;
}

Spaceship.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
};

Spaceship.prototype.applyForce = function (force) {
    this.acceleration.add(force);
};

Spaceship.prototype.turn = function (a) {
    this.heading += a;
};

Spaceship.prototype.thrust = function () {
    const angle = this.heading - PI / 2;
    const force = createVector(cos(angle), sin(angle));
    force.mult(0.1);
    this.applyForce(force);
    this.thrusting = true;
};

Spaceship.prototype.wrapEdges = function () {
    const buffer = this.r * 2;
    if (this.location.x > width + buffer) {
        this.location.x = -buffer;
    }
    else if (this.location.x < -buffer) {
        this.location.x = width + buffer;
    }
    if (this.location.y > height + buffer) {
        this.location.y = -buffer;
    }
    else if (this.location.y < -buffer) {
        this.location.y = height + buffer;
    }
};

Spaceship.prototype.display = function () {
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.location.x, this.location.y + this.r);
    rotate(this.heading);
    fill(174);
    if(this.thrusting) {
        fill(255, 0, 0);
    }
    beginShape();
    vertex(-this.r, this.r);
    vertex(0, -this.r);
    vertex(this.r, this.r);
    endShape(CLOSE);
    rectMode(CENTER);
    pop();

    this.thrusting = false;
};