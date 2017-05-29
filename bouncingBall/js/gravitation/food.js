function Food(sprite, maxX, scoreDisplay) {
    this.sprite = sprite;
    this.location = this.randomLocation();
    this.xoff = 0;
    this.yoff = 10000;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0.1, 0);
    this.mass = 4;
    this.maxX = maxX;
    this.scoreDisplay = scoreDisplay;
    this.dead = false;
}

Food.prototype.randomLocation = function () {
    const x = random(0, width);
    const y = random(0, height);
    return createVector(x, y);
};

Food.prototype.move = function () {
    if(!this.dead) {
        this.location.x = map(noise(this.xoff), 0, 1, width / 2, width);
        this.location.y = map(noise(this.yoff), 0, 1, 0, height);
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        this.xoff += 0.02;
        this.yoff += 0.02;
        this.checkOffscreen();
    }
};

Food.prototype.genMove = function (noiseInput, range) {
    return map(noise(noiseInput), 0, 1, 0, range);
};

Food.prototype.display = function () {
    if(!this.dead) {
        this.sprite.draw(this.location.x, this.location.y, this.sprite.sprite.width / 2, this.sprite.sprite.height / 2);
    }
};

Food.prototype.width = function () {
    return this.sprite.sprite.width / 2;
};

Food.prototype.height = function () {
    return this.sprite.heigth;
};

Food.prototype.applyCollision = function (force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Food.prototype.checkOffscreen = function() {
    let offscreen = this.location.x > this.maxX;
    if(offscreen) {
        this.scoreDisplay.changeStatusMessage("Well done. The hamburger is dead!");
        this.dead = true;
    }
};