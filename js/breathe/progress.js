function Progress(missingTime, totalTime, totalWidth, progressbarGraphics) {
    this.missingTime = missingTime;
    this.totalTime = totalTime;
    this.totalWidth = totalWidth;
    this.progressHeight = 10;
    this.progressbarGraphics = progressbarGraphics;
}

Progress.prototype.getProgressWidth = function () {
    return (this.missingTime * this.totalWidth) / this.totalTime;
};

Progress.prototype.setProgressbarGraphics = function (progressbarGraphics) {
    this.progressbarGraphics = progressbarGraphics;
};

Progress.prototype.fillProgress = function (width) {

    this.progressbarGraphics.background(60);
    this.progressbarGraphics.noStroke();
    this.progressbarGraphics.fill(255, 255, 255);
    this.progressbarGraphics.rect(0, 0, this.getProgressWidth(), this.progressHeight);
    image(this.progressbarGraphics, -width * 0.5, height * 0.5 - this.progressHeight)
};