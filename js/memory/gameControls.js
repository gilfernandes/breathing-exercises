const colourDiv = "colourDiv";
const buttonDivId = "buttonDiv";

const initialMainMessage = "Memorize the pattern that appears on the screen and tap when it disappears to play this game";
const redrawPatternMessage = "Please redraw the pattern by first selecting the colour and then the balls";

function GameControls(grid, gameHistory, successStory) {
    this.startButton = null;
    this.checkButton = null;
    this.animationOn = true;
    this.message = null;
    this.colourButtons = null;
    this.colourDiv = null;
    this.grid = grid;
    this.gameHistory = gameHistory;
    this.successStory = successStory;
    this.grid.setGameControls(this);
    this.animationInterval = null;
}

GameControls.prototype.init = function () {
    this.createDivWithId(buttonDivId);
    this.startButton = createButton("Begin").parent(buttonDivId);
    handleStartButtonClick.call(this, this);
};

function handleStartButtonClick(gc) {
    const startButton = this.startButton;
    const grid = this.grid;
    startButton.mousePressed(function () {
        gc.stopAnimation();
        gc.quizStart();
    });

}

GameControls.prototype.quizStart = function() {
    grid.progressLevel();
    this.writeMessage(initialMainMessage);
    this.emptyGrid();
    redraw();

    this.removeColorDiv();
    this.grid.activateColours();
    redraw();

    const gc = this;

    setTimeout(function () {
        gc.gameHistory.markGuessDrawHistory();
        gc.emptyGrid();
        redraw();
        gc.writeMessage(`${redrawPatternMessage}`);
        gc.removeColorDiv();
        gc.colourDiv = gc.createDivWithId(colourDiv).parent("mainDiv");
        gc.colourButtons = [];
        gc.grid.colours.forEach(function (c, i, a) {
            const button = createButton("").parent(colourDiv);
            gc.colourButtons.push(button);
            button.style("background-color: " + c);
            if(i === 0) {
                button.class("firstButton");
            }
            else if(i === a.length - 1) {
                button.class("lastButton");
            }
            button.mousePressed(function (e) {
                const colourArray = e.target.style.backgroundColor.replace(/[^\d,]/g, '').split(',');
                gc.grid.activateClickMode(color(colourArray[0], colourArray[1], colourArray[2]));
            });
        });
        gc.hideStartButton();
    }, 5000);
};

GameControls.prototype.printSuccess = function () {
    this.removeColorDiv();
    this.writeMessage("<p class='success' id='successMessage'><span>Well done! Your guess is correct!</span></p><p id='successCountdown'></p>");
    let counter = 3;
    const gc = this;
    const countdown = setInterval(function() {
        document.getElementById("successCountdown").innerHTML = "" + counter--;
        if(counter < 0) {
            clearInterval(countdown);
            gc.removeElement('successMessage');
            gc.removeElement('successCountdown');
            gc.quizStart();
        }
    }, 1000);
};

GameControls.prototype.printError = function () {
    this.removeColorDiv();
    this.writeMessage("<p class='fail'><span>That was not the right pattern. Try again</span></p>");
    this.showStartButton();
};

GameControls.prototype.emptyGrid = function () {
    this.grid.removeColours();
};

GameControls.prototype.animate = function () {
    if (this.animationOn) {
        this.animationInterval = setInterval(function () {
            redraw();
        }, 2000);
    }
};

GameControls.prototype.stopAnimation = function() {
    if(this.animationOn) {
        clearInterval(this.animationInterval);
    }
    this.animationOn = false;
};

GameControls.prototype.writeMessage = function (html) {
    const $mainMessage = $("#mainMessage");
    if ($mainMessage.length === 0) {
        this.message = $("#mainDiv").prepend(
            `<p id="mainMessage">Memorize the pattern that appears on the screen and tap when it disappears to play this game</p>`);
    }
    else {
        $mainMessage.html(html);
    }
};

GameControls.prototype.createDivWithId = function (id) {
    const div = createDiv("").parent("mainDiv");
    return div.attribute("id", id);
};

GameControls.prototype.removeColorDiv = function () {
    this.removeElement(colourDiv);
};

GameControls.prototype.removeElement = function (elementId) {
    const elem = document.getElementById(elementId);
    if (elem !== null) {
        elem.parentNode.removeChild(elem);
    }
};

GameControls.prototype.hideStartButton = function() {
    document.getElementById("buttonDiv").style["display"] = "none";
};

GameControls.prototype.showStartButton = function() {
    document.getElementById("buttonDiv").style["display"] = "block";
};

