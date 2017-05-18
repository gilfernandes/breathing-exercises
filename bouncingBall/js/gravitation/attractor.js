function Attractor(mass) {
    this.mass = mass;
    this.location = createVector(width / 2, height / 2);
    this.G = 11;
    this.dragging = false;
    this.rollover = false;
    this.dragOffset = createVector(0.0, 0.0);
}

Attractor.prototype.display = function () {
    stroke(0);
    fill(175, 200);
    ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
};

Attractor.prototype.attract = function (m) {
    const force = p5.Vector.sub(this.location, m.location);
    let d = force.mag();
    d = this.constrain(d, 50, 300.0);
    force.normalize();
    let strength = (this.G * this.mass * m.mass) / (d * d);
    force.mult(strength);
    return force;
};

Attractor.prototype.constrain = function (d, min, max) {
    if (d < min) {
        d = min;
    }
    else if (d > max) {
        d = max;
    }
    return d;
};

Attractor.prototype.display = function () {
    strokeWeight(4);
    stroke(0);
    if (this.dragging) {
        fill(50);
    }
    else if (this.rollover) {
        fill(100);
    }
    else {
        fill(175, 200);
    }
    ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
};

Attractor.prototype.mouseClickDist = function (mx, my) {
    return dist(mx, my, this.location.x, this.location.y);
};

Attractor.prototype.clicked = function (mx, my) {
    const d = this.mouseClickDist(mx, my);
    if (d < this.mass) {
        this.dragging = true;
        this.dragOffset.x = this.location.x - mx;
        this.dragOffset.y = this.location.y - my;
    }
};

Attractor.prototype.hover = function () {
    const d = this.mouseClickDist(this, this.mx, this.my);
    this.rollover = d < this.mass;
};

Attractor.prototype.stopDragging = function () {
    this.dragging = false;
};

Attractor.prototype.drag = function() {
    if (this.dragging) {
        this.location.x = mouseX + this.dragOffset.x;
        this.location.y = mouseY + this.dragOffset.y;
    }
};