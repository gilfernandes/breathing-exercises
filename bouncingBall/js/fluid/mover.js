function Mover(maxX, maxY, sprite, mass, location) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.location = location ? location : createVector(random(0, this.maxX), random(0, this.maxY));
    this.velocity = createVector(random(0.5, 2), random(2, 4));
    this.acceleration = createVector(0.1, 0.001);
    this.dir = createVector(0, 0);
    this.mouse = null;
    this.sprite = sprite;
    this.mass = mass;
}

Mover.prototype.applyForce = function (force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.isInside = function (liquid) {
    return this.location.x > liquid.x && this.location.x < liquid.x + liquid.w
        && this.location.y > liquid.y && this.location.y < liquid.y + liquid.h;
};

Mover.prototype.drag = function (liquid) {
    let speed = this.velocity.mag();
    let dragMagnitude = liquid.dragCoefficient * speed * speed;
    let drag = createVector(this.velocity.x, this.velocity.y);
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMagnitude);
    this.applyForce(drag);
};

Mover.prototype.move = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    // this.checkEdges();
};

Mover.prototype.checkEdges = function () {
    if ((this.location.x > this.maxX) || (this.location.x < 0)) {
        this.velocity.x *= -1;
    }
    if (this.location.x < 0) {
        this.location.x = 0;
    }

    if ((this.location.y > this.maxY) || (this.location.y < 0)) {
        this.velocity.y *= -1;
    }

    if (this.location.y < 0) {
        this.location.y = 0;
    }
};

Mover.prototype.draw = function () {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16);
    // this.sprite.draw(this.location.x, this.location.y, this.sprite.sprite.width + this.mass, this.sprite.sprite.height + this.mass);
};