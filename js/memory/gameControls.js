function GameControls() {
    this.startButton = null;
    this.animationOn = true;
    this.message = null;
    this.colourButtons = null;
}

GameControls.prototype.init = function() {
    const buttonDivId = "buttonDiv";
    this.createDivWithId(buttonDivId);
    this.startButton = createButton("Start").parent(buttonDivId);
    var gc = this;

    this.startButton.mousePressed(function() {
        gc.animationOn = false;
        noLoop();
        gc.writeMessage("<p>Memorize the next pattern and then draw it after it disappears</p>");
        gc.emptyGrid();
        setTimeout(function() {
            grid.activateColours();
            loop();
            noLoop();
            setTimeout(function() {
                gc.emptyGrid();
                gc.writeMessage("<p>Draw the pattern by clicking first on the colour and then on the grid boxes.</p>");
                const colourDiv = "colourDiv";
                gc.createDivWithId(colourDiv);
                this.colourButtons = [];
                grid.colours.forEach(c => {
                    const button = createButton("").parent(colourDiv);
                    this.colourButtons.push(button);
                    button.style("background-color: " + c);
                });
                createDiv("");
            }, 5000);
        }, 5000);


    })
};

GameControls.prototype.emptyGrid = function() {
    grid.removeColours();
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
    var div = createDiv("");
    return div.attribute("id", id);
};