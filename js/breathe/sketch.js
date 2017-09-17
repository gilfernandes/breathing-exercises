let startWidth = 50; // TODO: put this variable into the BreatheBall class.
const buttonDivHeight = window.innerHeight * 0.2;

const textInhale = "Breathe in";
const textExhale = "Breathe out";
const textHold = "Hold";

let totalTime = 100000000.0; // means the breathing exercises never ever stops

let distPerFrame;

let breathingInterval;

let breatheText;

let ctx;

let breathPause;

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

let breathBall;

let standardBreathing = new Breathing(totalTime, textInhale, 4, 4);

let counter = new Counter();

let progress;

let buttonBar = new ButtonBar(standardBreathing.inhaleTime, standardBreathing.exhaleTime, buttonDivHeight);

let player;

function preload() {
    player = new Player(["../assets/sound/e_eyesee_word_of_silence_track_07.ogg",
        "../assets/sound/e_jewel_purpose_track_06.ogg"]);
}

let startCounter = function () {
    counter.start(function () {
        counter.counter++;
    });
};

function setup() {

    createBreatheBall();
    breatheText = new BreatheText(color(0x4b, 0xc6, 0xd5), standardBreathing.textSize, window.innerHeight * 0.2);
    breatheText.initDiv();

    let canvas = createBreathingCanvas();

    ctx = canvas.drawingContext;

    progress = new Progress(standardBreathing.time, standardBreathing.time, window.innerWidth, null, window.innerHeight * 0.02);
    initProgressCanvas(canvas);

    updateTimer();

    buttonBar.createButtons();
    buttonBar.fadeOut(5000); // hide the button bar after five seconds.

    window.onresize = function () { // Adapt the layout on resize
        canvas.size(window.innerWidth, window.innerHeight - buttonDivHeight);
        breathBall.maxWidth = calcMaxWidth(window.innerWidth, window.innerHeight);
    };

    startCounter();

    player.playRandom();

    breathPause = new BreathPause();

}

function draw() {
    distPerFrame = calcFrameRate();

    breathBall.move();
    breathBall.displayImage();

    breatheText.displayText(standardBreathing.text);
}

function mousePressed() {
    buttonBar.fadeIn();
}

let createBreatheBall = function () {
    let maxWidth = calcMaxWidth(canvasWidth(), window.innerHeight);
    startWidth = maxWidth - maxWidth * 0.5;
    breathBall = new BreathBall(startWidth, maxWidth);
};

let calcMaxWidth = function (width, height) {
    const widthBiggerHeight = width > height;
    return widthBiggerHeight ? height : width;
};

let createBreathingCanvas = function () {
    function extractCanvasHeight() {
        return window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    }
    const canvasHeight = extractCanvasHeight();
    let canvas = createCanvas(canvasWidth(), canvasHeight).id("mainCanvas");
    canvas.parent("#mainDiv");
    document.getElementById("mainCanvas").style.position = "absolute";
    document.getElementById("mainCanvas").style.top = "50%";
    document.getElementById("mainCanvas").style.left = ((window.innerWidth - canvasWidth()) / 2) + "px";
    console.log("margin left: " + document.getElementById("mainCanvas").style.left);
    document.getElementById("mainCanvas").style.marginTop = (canvasHeight / 2 * -1) + "px";
    return canvas;
};



let canvasWidth = function () {
    return window.innerWidth * 0.96;
};

let stopAnimation = function () {
    clearInterval(breathingInterval);
    counter.stop();
    noLoop();
};

let restartAnimation = function (inhaleTime, exhaleTime) {
    breathPause.clearTimouts();
    stopAnimation();
    initProgressCanvas(canvas);
    breathBall.dir = 1;
    standardBreathing = new Breathing(totalTime, textInhale, inhaleTime, exhaleTime);
    createBreatheBall();
    loop();
    updateTimer();
    player.restartRandom();
    startCounter();
};

let updateTimer = function () {
    breathingInterval = setInterval(function () {
        standardBreathing.time -= standardBreathing.step;
        let number = standardBreathing.time;
        progress.setProperties(number, totalTime, width, progress.progressbarGraphics);
        if (number < 0) {
            clearInterval(breathingInterval);
            noLoop();
        }
    }, standardBreathing.interval);
};

let calcFrameRate = function () {
    const frameR = frameRate();
    return breatheCalculations.calcDistance(standardBreathing.exhaleTime, breathBall.maxWidth - startWidth, (frameR | 0) === 0 ? 60 : frameR);
};