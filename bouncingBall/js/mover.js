function Mover(maxX, maxY, sprite) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.pos = createVector(random(0, this.maxX), random(0, this.maxY));
    this.speed = createVector(random(0.5, 2), random(2, 4));
    this.acceleration = createVector(-0.001, 0.001);
    this.dir = createVector(0, 0);
    this.mouse = null;
    this.sprite = sprite;
}

Mover.prototype.move = function() {
    if(this.mouse) {
        this.dir = p5.Vector.sub(this.mouse, this.pos);
        this.dir.normalize();
        this.dir.mult(random(0, 0.6));
    }
    this.acceleration = this.dir;
    this.speed.add(this.acceleration);
    this.speed.limit(10);
    this.pos.add(this.speed);
    // this.checkEdges();
};

Mover.prototype.checkEdges = function() {
    if((this.pos.x > this.maxX) || (this.pos.x < 0)) {
        this.speed.x *= -1;
    }

    if((this.pos.y > this.maxY) || (this.pos.y < 0)) {
        this.speed.y *= -1;
    }
};

Mover.prototype.draw = function () {
    stroke(0);
    fill(175);
    // ellipse(this.pos.x, this.pos.y, 16, 16);
    this.sprite.draw(this.pos.x, this.pos.y);
};