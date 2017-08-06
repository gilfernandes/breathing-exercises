let progress;

let totalTime = 120;

const textInhale = "Breathe in";
const textExhale = "Breathe out";
const textHold = "Hold";

let breathBall;

let breathingInterval;

let startWidth = 50; // TODO: put this variable into the BreatheBall class.

let counter = new Counter();

let distPerFrame;

let breatheText;

function Breathing(time, text, inhaleTime, exhaleTime) {
    this.time = time;
    this.text = text;
    this.maxTextSize = window.innerWidth < 1024 ? 64 : 24;
    this.textSize = this.maxTextSize;
    this.interval = 125;
    this.step = 0.125;
    this.inhaleTime = inhaleTime;
    this.exhaleTime = exhaleTime;
    this.breathePause = 3;
}

let standardBreathing = new Breathing(totalTime, textInhale, 4, 4);

function AnimationControl() {
}

AnimationControl.prototype.startAnimation = function(inhaleTime, exhaleTime) {
    this.stopAnimation();
    this.createBreatheBall();
    this.initProgress(inhaleTime, exhaleTime);
    this.updateTimer();
    this.startCounter();
};

AnimationControl.prototype.initProgress = function (inhaleTime, exhaleTime) {
    const progressHeigth2 = progressHeigth();
    progress = new Progress(standardBreathing.time, standardBreathing.time, window.innerWidth, null, progressHeigth2);
    new p5(initProgressCanvas);
    standardBreathing = new Breathing(totalTime, textInhale, inhaleTime, exhaleTime);
    new p5(initMainCanvas);
};

AnimationControl.prototype.createBreatheBall = function () {
    let maxWidth = this.calcMaxWidth(window.innerWidth, window.innerHeight);
    startWidth = maxWidth - maxWidth * 0.5;
    breathBall = new BreathBall(startWidth, maxWidth);
    breathBall.dir = 1;
};

AnimationControl.prototype.calcMaxWidth = function (width, height) {
    const widthBiggerHeight = width > height;
    return widthBiggerHeight ? height : width;
};

AnimationControl.prototype.stopAnimation = function () {
    if(typeof breathingInterval !== "undefined") {
        clearInterval(breathingInterval);
        counter.stop();
        noLoop();
    }
};

AnimationControl.prototype.updateTimer = function () {
    breathingInterval = setInterval(function () {
        standardBreathing.time -= standardBreathing.step;
        let number = standardBreathing.time;
        progress.setProperties(number, totalTime, window.innerWidth, progress.progressbarGraphics);
        if (number < 0) {
            clearInterval(breathingInterval);
            noLoop();
        }
    }, standardBreathing.interval);
};

AnimationControl.prototype.startCounter = function () {
    counter.start(function () {
        counter.counter++;
    });
};

AnimationControl.prototype.calcFrameRate = function (canvas) {
    const frameR = canvas.frameRate();
    return breatheCalculations.calcDistance(standardBreathing.exhaleTime, breathBall.maxWidth - startWidth, (frameR | 0) === 0 ? 60 : frameR);
};

let initMainCanvas = function( p ) {

    p.setup = function() {
        const size = buttonBar.animationControl.calcMaxWidth(window.innerWidth, window.innerHeight);
        p.createCanvas(size, size, WEBGL);
        p.background(255);
        breatheText = new BreatheText(color(0x4b, 0xc6, 0xd5), standardBreathing.textSize, window.innerHeight * 0.2);
        breatheText.initDiv();
    };

    p.draw = function() {
        distPerFrame = buttonBar.animationControl.calcFrameRate(p);
        breathBall.move();
        breathBall.display3DWithCanvas(p);
        breatheText.displayText(standardBreathing.text);
    };
};