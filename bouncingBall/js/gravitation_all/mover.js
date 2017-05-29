

function Mover(location, mass) {
    this.location = location;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.massFactor = 24;
    this.G = 16;
}

Mover.prototype.applyForce = function (force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.resetAcceleration();
};

Mover.prototype.resetAcceleration = function () {
    this.acceleration.mult(0);
};

Mover.prototype.display = function () {
    stroke(0);
    strokeWeight(2);
    fill(0, 100);
    ellipse(this.location.x, this.location.y, this.mass * this.massFactor, this.mass * this.massFactor);
};

Mover.prototype.attract = function (m) {
    const force = p5.Vector.sub(this.location, m.location);
    let d = force.mag();
    d = constrain(d, 50, 300.0);
    force.normalize();
    let strength = (this.G * this.mass * m.mass) / (d * d);
    force.mult(strength);
    return force;
};
