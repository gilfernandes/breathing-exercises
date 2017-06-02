function Baton(location, velocity, acceleration, handleSize, translationVector) {
    this.velocity = velocity;
    this.location = location;
    this.size = 50;
    this.angle = 0;
    this.handleSize = handleSize;
    this.acceleration = acceleration;
    this.translationVector = translationVector;
}

Baton.prototype.move = function () {
    this.velocity += this.acceleration;
    this.angle = (this.angle + this.velocity) % 360;
    if(this.velocity > 0.15 || this.velocity < 0.000001) {
        this.acceleration *= -1;
    }
};

Baton.prototype.display = function () {
    push();
    translate(width / 2 + this.translationVector.x, height / 2 + this.translationVector.y);
    rotate(this.angle);
    line(this.location.x - this.size, this.location.y, this.location.x + this.size, this.location.y);
    fill(127);
    ellipse(this.location.x + this.size, this.location.y, this.handleSize, this.handleSize);
    ellipse(this.location.x - this.size, this.location.y, this.handleSize, this.handleSize);
    pop();
};