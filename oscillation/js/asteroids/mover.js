function Mover(m, x, y) {
    this.mass = m;
    this.location = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
}

Mover.prototype.applyForce = function (force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    this.aAcceleration = this.acceleration.x / 10.0;
    this.aVelocity += this.aAcceleration;
    this.aVelocity = constrain(this.aVelocity, -0.1, 0.1);
    this.angle += this.aVelocity;

    this.acceleration.mult(0);
};

Mover.prototype.display = function () {
    stroke(0);
    fill(175, 200);
    rectMode(CENTER);
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    rect(0, 0, this.mass * 16, this.mass * 16);
    pop();
};

