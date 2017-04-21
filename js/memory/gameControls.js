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
        quizStart();
    });
    function quizStart() {

        grid.progressLevel();
        gc.writeMessage("<p>Memorize this pattern and then draw it after it disappears</p>");
        gc.emptyGrid();
        loop();
        noLoop();

        gc.removeColorDiv();
        gc.grid.activateColours();
        loop();
        noLoop();

        setTimeout(function () {
            gc.gameHistory.markGuessDrawHistory();
            gc.emptyGrid();
            loop();
            noLoop();
            gc.writeMessage("<p>Draw the pattern by clicking first on the colour and then on the grid boxes.</p>");
            gc.removeColorDiv();
            gc.colourDiv = gc.createDivWithId(colourDiv);
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
            createDiv("");
        }, 5000);
    }
}

// Not is use. Can be removed
GameControls.prototype.printSuccess = function () {
    this.removeColorDiv();
    this.writeMessage("<p class='success'>Well done! Your guess is correct!</p>")
};

// Not is use. Can be removed
GameControls.prototype.printError = function () {
    this.removeColorDiv();
    this.writeMessage("<p class='fail'>Oops! That was not the right pattern. Try again</p>")
};

GameControls.prototype.emptyGrid = function () {
    this.grid.removeColours();
};

GameControls.prototype.animate = function () {
    if (this.animationOn) {
        this.animationInterval = setInterval(function () {
            loop();
            noLoop();
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
            .attribute("id", messageId);
    }
    else {
        document.getElementById(this.message.id()).innerHTML = html;
    }
};

GameControls.prototype.createDivWithId = function (id) {
    const div = createDiv("");
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

