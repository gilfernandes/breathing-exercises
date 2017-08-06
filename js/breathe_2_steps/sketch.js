
const buttonDivHeight = window.innerHeight * 0.2;

let ctx;

let buttonBar = new ButtonBar(buttonDivHeight, new AnimationControl());

let player; // Not used

let breatheForm = new BreatheForm();

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
    (function hideDefaultCanvas() {
        document.getElementById("defaultCanvas0").style = "display: none";
    }());
    buttonBar.createButtons();
    breatheForm.createForm();
    noLoop();
}

let waitAfterInhale = function () {
    standardBreathing.text = textHold;
    breathBall.dir = 0;
    setTimeout(function () {
        counter.reset();
        breathBall.dir = -1;
        breathBall.reduceSize();
        standardBreathing.text = textExhale;
    }, standardBreathing.breathePause * 1000);
};

let waitAfterExhale = function () {
    standardBreathing.text = textHold;
    breathBall.dir = 0;
    setTimeout(function () {
        counter.reset();
        breathBall.dir = 1;
        breathBall.augmentSize();
        standardBreathing.text = textInhale;
    }, standardBreathing.breathePause * 1000);
};