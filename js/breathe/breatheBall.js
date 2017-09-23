function BreathBall(width, maxWidth) {
    this.width = width;
    this.dir = 1;
    this.maxWidth = maxWidth;
    this.sprite = new Sprite("../assets/images/breathe/breathing-bubble-big.png");
    this.theta = 0;
    this.noiseRed = 0;
    this.noiseBlue = 10;
    this.noiseGreen = 20;
    this.noiseRedVelocity = 0.003;
    this.noiseBlueVelocity = 0.04;
    this.noiseGreenVelocity = 0.03;
    this.YDiff = random(0, 5);
    this.detailFactor = 1.0;
    this.multiCircles = new MultiCircles(width, maxWidth, 5);
}

BreathBall.prototype.move = function () {
    const active = this.dir !== 0;
    if ((this.width > this.maxWidth || counter.counter > standardBreathing.inhaleTime) && active) {
        breathPause.waitAfterInhale();
    }
    else if ((this.width < startWidth || counter.counter > standardBreathing.inhaleTime) && active) {
        breathPause.waitAfterExhale();
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

BreathBall.prototype.drawInit = function () {
    clear();
    noStroke();
};

BreathBall.prototype.drawInitAndTranslate = function () {
    this.drawInit();
    translate(width / 2, height / 2);
};

BreathBall.prototype.display = function () {

    drawInitAndTranslate();
    this.multiCircles.draw();

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

BreathBall.prototype.displayWithCanvas = function (canvas) {
    canvas.background(color(0xff, 0xff, 0xff));
    canvas.noStroke();
    canvas.fill(color(0, 0, 255));
    const radius = this.width * 0.8;
    canvas.ellipse(canvas.width / 2, canvas.height / 2, radius);
};

BreathBall.prototype.displayImage = function () {
    this.drawInitAndTranslate();
    this.multiCircles.draw();
    const radius = this.width;
    const posX = -radius / 2;
    this.sprite.draw(posX, posX, radius, radius)
};

BreathBall.prototype.changeLighting = function () {
    if (this.noiseRed > 1 || this.noiseRed < 0) {
        this.noiseRedVelocity *= -1;
    }
    if (this.noiseBlue > 1 || this.noiseBlue < 0) {
        this.noiseBlueVelocity *= -1;
    }
    if (this.noiseGreen > 1 || this.noiseGreen < 0) {
        this.noiseGreenVelocity *= -1;
    }
    this.noiseRed += this.noiseRedVelocity;
    this.noiseBlue += this.noiseBlueVelocity;
    this.noiseGreen += this.noiseGreenVelocity;
};

BreathBall.prototype.display3D = function () {
    this.drawInit();
    ambientLight(map(this.noiseRed, 0, 1, 10, 150), map(this.noiseGreen, 0, 1, 40, 100), map(this.noiseBlue, 0, 1, 250, 255));
    let dirY = (mouseY / height - 0.5) * 2;
    let dirX = (mouseX / width - 0.5) * 2;
    directionalLight(50, 60, 70, dirX, -dirY, 0.5);
    rotateY(map(noise(this.theta, this.theta), 0, 1, 0, 0.05) + this.YDiff);
    rotateZ(this.theta);
    rotateX(this.theta);
    // texture(this.sprite.sprite);
    sphere(this.width * 0.4);
    this.theta += 0.003;
    this.changeLighting();
};

BreathBall.prototype.display3DWithCanvas = function (canvas) {
    canvas.background(color(0xff, 0xff, 0xff));
    canvas.noStroke();
    // canvas.ambientLight(map(this.noiseRed, 0, 1, 10, 150), map(this.noiseRed, 0, 1, 40, 100), map(this.noiseBlue, 0, 1, 250, 255));
    canvas.ambientLight(map(this.noiseRed, 0, 1, 10, 150), map(this.noiseRed, 0, 1, 40, 100), map(this.noiseBlue, 0, 1, 250, 255));
    canvas.pointLight(200, 200, 200, 100, 100, 0);
    canvas.ambientMaterial(0, 250, 250);

    canvas.sphere(this.width * 0.4, 24 * this.detailFactor, 16 * this.detailFactor);

    this.changeLighting();
};