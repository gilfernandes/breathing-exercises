function Attractor(mass, location) {
    this.mass = mass;
    this.location = location;
    this.g = 0.4;
}

Attractor.prototype.attract = function(m) {
    const force = p5.Vector.sub(this.location, m.location);
    let distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    const strength = (this.g * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

Attractor.prototype.display = function(m) {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.location.x, this.location.y, 48, 48);
};