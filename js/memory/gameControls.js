const colourDiv = "colourDiv";
const buttonDivId = "buttonDiv";

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
    this.startButton = createButton("Go").parent(buttonDivId);
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
    this.writeMessage("<p>Memorize this pattern and then draw it after it disappears</p>");
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
        gc.writeMessage("<p>Draw the pattern by clicking first on the colour and then on the grid boxes.</p>");
        gc.removeColorDiv();
        gc.colourDiv = gc.createDivWithId(colourDiv).parent("mainDiv");
        gc.colourButtons = [];
        gc.grid.colours.forEach(function (c) {
            const button = createButton("").parent(colourDiv);
            gc.colourButtons.push(button);
            button.style("background-color: " + c);
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
    this.writeMessage("<p class='success' id='successMessage'>Well done! Your guess is correct!</p><p id='successCountdown'></p>");
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
    this.writeMessage("<p class='fail'>Oops! That was not the right pattern. Try again</p>");
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
    if (!this.message) {
        const messageId = "mainMessage";
        this.message = createDiv("<p>Memorize the next pattern and then draw it after it disappears</p>")
            .attribute("id", messageId).parent("mainDiv");
    }
    else {
        document.getElementById(this.message.id()).innerHTML = html;
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

