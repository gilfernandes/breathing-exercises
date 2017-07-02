function Attractor(mass, location) {
    this.mass = mass;
    this.location = location;
    this.g = 0.4;
    this.resetPulse();
}

Attractor.prototype.resetPulse = function() {
    this.pulse = 0.0;
    this.pulseVelocity = 0.002;
};

Attractor.prototype.attract = function(m) {
    const force = p5.Vector.sub(this.location, m.location);
    let distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    const strength = (this.g * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

Attractor.prototype.pulsate = function () {
    this.pulse += this.pulseVelocity;
    if(this.pulse > 2.1) {
        this.resetPulse();
    }
};

Attractor.prototype.display = function(m) {
    stroke(0);
    strokeWeight(2);
    fill(127);
    this.pulsate();
    scale(this.pulse, this.pulse);
    ellipse(this.location.x, this.location.y, 48, 48);
};