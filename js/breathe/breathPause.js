function BreathPause() {
    this.inhaleTimeout = null;
    this.exhaleTimeout = null;
}

BreathPause.prototype.waitAfterInhale = function() {
    standardBreathing.text = textHold;
    breathBall.dir = 0;
    this.inhaleTimeout = setTimeout(function () {
        counter.reset();
        breathBall.dir = -1;
        breathBall.reduceSize();
        standardBreathing.text = textExhale;
    }, standardBreathing.breathePause * 1000);
};

BreathPause.prototype.waitAfterExhale = function() {
    standardBreathing.text = textHold;
    breathBall.dir = 0;
    this.exhaleTimeout = setTimeout(function () {
        counter.reset();
        breathBall.dir = 1;
        breathBall.augmentSize();
        standardBreathing.text = textInhale;
    }, standardBreathing.breathePause * 1000);
};

BreathPause.prototype.clearTimouts = function() {
    if(this.inhaleTimeout) {
        clearTimeout(this.inhaleTimeout);
    }
    if(this.exhaleTimeout) {
        clearTimeout(this.exhaleTimeout);
    }
};