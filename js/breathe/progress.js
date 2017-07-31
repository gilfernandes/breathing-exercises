function Progress(missingTime, totalTime, totalWidth, progressbarGraphics, progressHeight) {
    this.missingTime = missingTime;
    this.totalTime = totalTime;
    this.totalWidth = totalWidth;
    this.progressbarGraphics = progressbarGraphics;
    this.progressHeight = progressHeight;
}

Progress.prototype.setProperties = function(missingTime, totalTime, totalWidth, progressbarGraphics) {
    this.missingTime = missingTime;
    this.totalTime = totalTime;
    this.totalWidth = totalWidth;
    this.progressbarGraphics = progressbarGraphics;
};

Progress.prototype.getProgressWidth = function () {
    return (this.missingTime * this.totalWidth) / this.totalTime;
};

Progress.prototype.fillProgress = function (canvas) {
    canvas.background(60);
    canvas.noStroke();
    canvas.fill(255, 255, 255);
    canvas.rect(0, 0, this.getProgressWidth(), this.progressHeight);
};

let progressHeigth = function() {
    return window.innerHeight * 0.02;
};

let initProgress = function () {
    const progressHeigth2 = progressHeigth();
    progress = new Progress(standardBreathing.time, standardBreathing.time, window.innerWidth, null, progressHeigth2);
    let canvas = new p5(initProgressCanvas);
};

let initProgressCanvas = function( p ) {

    p.setup = function() {
        p.createCanvas(window.innerWidth, progressHeigth());
        p.background(255);
    };

    p.draw = function() {
        progress.fillProgress(p);
    };
};