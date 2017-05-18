function Mover(location, velocity, acceleration, col) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.mass = 1;
    this.color = col;
}

Mover.prototype.applyForce = function (force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
};

Mover.prototype.display = function () {
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.location.x, this.location.y, 16, 16);
};

Mover.prototype.checkEdges = function() {

    if (this.location.x > width) {
        this.location.x = 0;
    } else if (this.location.x < 0) {
        this.location.x = width;
    }

    if (this.location.y > height) {
        this.location.y = 0;
    } else if (this.location.y < 0) {
        this.location.y = height;
    }

};