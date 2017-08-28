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

let standardBreathing;

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

function AnimationControl() {
    this.p5MainCanvas = null;
    this.stopped = true;
}

AnimationControl.prototype.startAnimation = function (inhaleTime, exhaleTime) {
    totalTime = breatheForm.getSeconds();
    standardBreathing = new Breathing(totalTime, totalTime, 4, 4);
    breatheForm.hideForm();
    this.createBreatheBall();
    this.initProgress(inhaleTime, exhaleTime);
    this.updateTimer();
    this.startCounter();
};

AnimationControl.prototype.initProgress = function (inhaleTime, exhaleTime) {
    const progressHeigth2 = progressHeigth();
    progress = new Progress(standardBreathing.time, standardBreathing.time, window.innerWidth, null, progressHeigth2);
    standardBreathing = new Breathing(totalTime, textInhale, inhaleTime, exhaleTime);
    this.stopped = false;
    if (domUtils.exists("progressCanvas")) { // Restart
        domUtils.show("progressCanvas");
        domUtils.show("mainCanvas");
        breatheText.initDiv();
        this.p5MainCanvas.loop();
    }
    else { // First start
        new p5(initProgressCanvas);
        new p5(initMainCanvas);
    }
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

AnimationControl.prototype.updateTimer = function () {
    const animControl = this;
    breathingInterval = setInterval(function () {
        standardBreathing.time -= standardBreathing.step;
        let number = standardBreathing.time;
        progress.setProperties(number, totalTime, window.innerWidth, progress.progressbarGraphics);
        if (number < 0) {
            animControl.stopCounters();
            animControl.stopped = true;
        }
    }, standardBreathing.interval);
};

AnimationControl.prototype.stopCounters = function () {
    counter.stop();
    clearInterval(breathingInterval);
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

AnimationControl.prototype.stopAnimation = function (canvas) {
    if (typeof progress !== "undefined" && progress.missingTime <= 0) {
        clearTimeout(pauseTimeoutInhale);
        clearTimeout(pauseTimeoutExhale);
        breathBall = null;
        if (typeof canvas !== "undefined") {
            canvas.noLoop();
        }
        this.goBackToMenu();
    }
};

AnimationControl.prototype.goBackToMenu = function () {

    this.hide("counter");
    this.hide("breatheMessage");
    this.hide("restartButton");
    for (let i = 0; i < document.getElementsByTagName("canvas").length; i++) {
        document.getElementsByTagName("canvas")[i].style.display = "none";
    }

    function show(id) {
        document.getElementById(id).style.display = "block";
    }

    this.show("buttonDiv");
    this.show("breatheForm");
    this.stopCounters();
};

AnimationControl.prototype.hide = function (id) {
    domUtils.hide(id);
};

AnimationControl.prototype.show = function (id) {
    domUtils.show(id);
};

let initMainCanvas = function (p) {

    p.setup = function () {
        const size = buttonBar.animationControl.calcMaxWidth(window.innerWidth, window.innerHeight);
        p.createCanvas(size, size, WEBGL).id("mainCanvas");
        p.background(255);
        breatheText = new BreatheText(color(0x4b, 0xc6, 0xd5), standardBreathing.textSize, window.innerHeight * 0.2);
        breatheText.initDiv();
        animationControl.p5MainCanvas = p;
    };

    p.draw = function () {
        distPerFrame = buttonBar.animationControl.calcFrameRate(p);
        breathBall.move();
        breathBall.display3DWithCanvas(p);
        breatheText.displayText(standardBreathing.text);
        buttonBar.animationControl.stopAnimation(p);
    };
};