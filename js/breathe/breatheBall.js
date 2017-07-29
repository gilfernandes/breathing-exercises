function BreathBall(width, maxWidth) {
    this.width = width;
    this.dir = 1;
    this.maxWidth = maxWidth;
    this.sprite = new Sprite("../assets/images/breathe/Bee-yogi_th.jpg");
}

BreathBall.prototype.move = function () {
    const active = this.dir !== 0;
    if ((this.width > this.maxWidth || counter.counter > standardBreathing.inhaleTime) && active) {
        waitAfterInhale();
    }
    else if ((this.width < startWidth || counter.counter > standardBreathing.inhaleTime) && active) {
        waitAfterExhale();
    }
    this.incrementDecrement();
};

BreathBall.prototype.reduceSize = function () {
    this.width = this.maxWidth - 1;
};

BreathBall.prototype.augmentSize = function () {
    this.width = startWidth + 2;
};

BreathBall.prototype.incrementDecrement = function () {
    if (this.dir !== 0) {
        this.width += this.dir * distPerFrame;
    }
};

BreathBall.prototype.display = function () {

    const rotation1 = map(50, 0, 100, 0, this.width);
    const rotation2 = map(50, 0, 100, 0, this.width);
    const location = map(50, 0, 100, 0, this.width);
    const sizeEllipse = this.width / 2;
    const xEllipse = 0;
    const yEllipse = 0;

    let startGrad = createVector(xEllipse - sizeEllipse / 2 + rotation1 + location, yEllipse + sizeEllipse / 2 - rotation2 - location);
    let endGrad = createVector(xEllipse + sizeEllipse / 2 - rotation1 - location, yEllipse - sizeEllipse / 2 + rotation2 + location);

    //ellipse
    let gradient = ctx.createLinearGradient(startGrad.x, startGrad.y, endGrad.x, endGrad.y);
    gradient.addColorStop(0, "#3c5da0");
    gradient.addColorStop(1, "#ffffff");
    ctx.beginPath();
    ctx.ellipse(xEllipse, yEllipse, sizeEllipse, sizeEllipse, 45 * Math.PI / 180, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
};

BreathBall.prototype.displayImage = function () {
    const radius = this.width;
    const posX = -radius / 2;
    this.sprite.draw(posX, posX, radius, radius)
};