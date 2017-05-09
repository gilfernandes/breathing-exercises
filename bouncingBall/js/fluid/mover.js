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
    return liquid.isInside(this.location);
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
    if (!this.mouseOnTop()) {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    } else {
        this.location = createVector(mouseX, mouseY);
    }
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

Mover.prototype.mouseOnTop = function () {
    return (this.mass * 16 > dist(mouseX, mouseY, this.location.x, this.location.y)) && pressedMouse;
};

Mover.prototype.draw = function () {
    stroke(0);
    fill(175);
    const radius = this.mass * 16;
    ellipse(this.location.x, this.location.y, radius, radius);
    // this.sprite.draw(this.location.x, this.location.y, this.sprite.sprite.width + this.mass, this.sprite.sprite.height + this.mass);
};