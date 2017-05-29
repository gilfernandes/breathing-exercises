function Mover(location, velocity, acceleration, col) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.mass = 1;
    this.color = col;
    this.dead = false;
    this.collided = false;
    this.shoot = false;
    this.shootSpeed = 0;
    this.shootAcceleration = 0.1;
    this.r = 16;
}

Mover.prototype.applyForce = function (force) {
    if(!this.shoot) {
        const f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }
};

Mover.prototype.shootMe = function () {
    this.shoot = true;
};

Mover.prototype.isDead = function () {
    return this.dead;
};

Mover.prototype.isCollided = function () {
    return this.collided;
};

Mover.prototype.update = function () {
    if(!this.shoot) {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }
    else {
        this.shootSpeed += this.shootAcceleration;
        this.location.x += this.shootSpeed;
    }
};

Mover.prototype.detectCollision = function (food) {
    let d = dist(this.location.x, this.location.y, food.location.x, food.location.y);
    if(d < this.r + food.width() / 2) {
        this.dead = true;
        this.collided = true;
        food.applyCollision(createVector(this.shootSpeed, 0));
    }
};

Mover.prototype.display = function () {
    if(!this.dead) {
        stroke(0);
        strokeWeight(2);
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.r, this.r);
    }
};

Mover.prototype.checkEdges = function() {

    if (this.location.x > width || this.location.x < 0 || this.location.y > height || this.location.y < 0) {
        this.dead = true;
    }

};