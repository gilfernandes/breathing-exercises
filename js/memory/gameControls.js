const colourDiv = "colourDiv";

function GameControls(grid, gameHistory) {
    this.startButton = null;
    this.animationOn = true;
    this.message = null;
    this.colourButtons = null;
    this.colourDiv = null;
    this.grid = grid;
    this.gameHistory = gameHistory;
}

GameControls.prototype.init = function() {
    const buttonDivId = "buttonDiv";
    this.createDivWithId(buttonDivId);
    this.startButton = createButton("Start").parent(buttonDivId);
    const gc = this;

    handleStartButtonClick.call(this, gc);
};

function handleStartButtonClick(gc) {
    this.startButton.mousePressed(function () {
        gc.animationOn = false;
        noLoop();
        gc.writeMessage("<p>Memorize the next pattern and then draw it after it disappears</p>");
        gc.emptyGrid();
        gc.removeColorDiv();
        setTimeout(function () {
            gc.grid.activateColours();
            loop();
            noLoop();
            setTimeout(function () {
                gc.emptyGrid();
                gc.writeMessage("<p>Draw the pattern by clicking first on the colour and then on the grid boxes.</p>");
                gc.removeColorDiv();
                gc.colourDiv = gc.createDivWithId(colourDiv);
                gc.colourButtons = [];
                gc.grid.colours.forEach(function (c) {
                    const button = createButton("").parent(colourDiv);
                    gc.colourButtons.push(button);
                    button.style("background-color: " + c);
                    button.mousePressed(function (e) {
                        const colourArray = e.srcElement.style.backgroundColor.replace(/[^\d,]/g, '').split(',');
                        gc.grid.activateClickMode(color(colourArray[0], colourArray[1], colourArray[2]));
                    });
                });
                createDiv("");
            }, 5000);
        }, 2000);
    });
}

GameControls.prototype.emptyGrid = function() {
    this.grid.removeColours();
    loop();
    noLoop();
};

GameControls.prototype.animate = function() {
    if(this.animationOn) {
        noLoop();
        setTimeout(function () {
            loop()
        }, 2000);
    }
    else {
        noLoop();
    }
};

GameControls.prototype.writeMessage = function(html) {
    if(!this.message) {
        const messageId = "mainMessage";
        this.message = createDiv("<p>Memorize the next pattern and then draw it after it disappears</p>")
            .attribute("id",  messageId);
    }
    else {
        document.getElementById(this.message.id()).innerHTML = html;
    }
};

GameControls.prototype.createDivWithId = function(id) {
    const div = createDiv("");
    return div.attribute("id", id);
};

GameControls.prototype.removeColorDiv = function() {
    const colourDivElem = document.getElementById(colourDiv);
    if(colourDivElem !== null) {
        colourDivElem.parentNode.removeChild(colourDivElem);
    }
};

