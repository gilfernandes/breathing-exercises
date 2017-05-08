function Mover(maxX, maxY, sprite, mass) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.pos = createVector(random(0, this.maxX), random(0, this.maxY));
    this.velocity = createVector(random(0.5, 2), random(2, 4));
    this.acceleration = createVector(-0.001, 0.001);
    this.dir = createVector(0, 0);
    this.mouse = null;
    this.sprite = sprite;
    this.mass = mass;
    this.frictionC = 0.1;
}

Mover.prototype.applyForce = function(force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.applyFriction = function(force) {
    const friction = createVector(this.velocity.x, this.velocity.y);
    friction.mult(-1);
    friction.normalize();
    friction.mult(this.frictionC);
    this.applyForce(friction);
};

Mover.prototype.move = function() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);
    // this.checkEdges();
};

Mover.prototype.checkEdges = function() {
    if((this.pos.x > this.maxX) || (this.pos.x < 0)) {
        this.velocity.x *= -1;
    }
    if(this.pos.x < 0) {
        this.pos.x = 0;
    }

    if((this.pos.y > this.maxY) || (this.pos.y < 0)) {
        this.velocity.y *= -1;
    }

    if(this.pos.y < 0) {
        this.pos.y = 0;
    }
};

Mover.prototype.draw = function () {
    stroke(0);
    fill(175);
    // ellipse(this.pos.x, this.pos.y, 16, 16);
    this.sprite.draw(this.pos.x, this.pos.y, this.sprite.sprite.width + this.mass, this.sprite.sprite.height + this.mass);
};