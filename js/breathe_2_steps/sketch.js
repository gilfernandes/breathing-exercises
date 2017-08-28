
const buttonDivHeight = window.innerHeight * 0.2;

let ctx;

const animationControl = new AnimationControl();

let buttonBar = new ButtonBar(buttonDivHeight, animationControl);

let player; // Not used

let breatheForm = new BreatheForm();

let pauseTimeoutInhale;

let pauseTimeoutExhale;

function preload() {
    player = new Player(["../assets/sound/e_eyesee_word_of_silence_track_07.ogg",
        "../assets/sound/e_jewel_purpose_track_06.ogg"]);
}

let startCounter = function () {
    counter.start(function () {
        if(!animationControl.stopped) {
            counter.counter++;
        }
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
    pauseTimeoutInhale = setTimeout(function () {
        if(!animationControl.stopped && breathBall !== null) {
            counter.reset();
            breathBall.dir = -1;
            breathBall.reduceSize();
            standardBreathing.text = textExhale;
        }
    }, standardBreathing.breathePause * 1000);
};

let waitAfterExhale = function () {
    standardBreathing.text = textHold;
    breathBall.dir = 0;
    pauseTimeoutExhale = setTimeout(function () {
        if(!animationControl.stopped && breathBall !== null) {
            counter.reset();
            breathBall.dir = 1;
            breathBall.augmentSize();
            standardBreathing.text = textInhale;
        }
    }, standardBreathing.breathePause * 1000);
};