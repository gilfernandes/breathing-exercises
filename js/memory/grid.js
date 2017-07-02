function Grid(rows, cols, colorSize, colours, gameHistory, successStory) {
    this.rows = rows;
    this.cols = cols;
    this.colorSize = colorSize;
    this.coloured = [];
    this.colours = colours;
    this.noColours = false;
    this.drawClick = false;
    this.clickColor = color(100, 100, 100);
    this.clickHistory = [];
    this.gameHistory = gameHistory;
    this.gameControls = null;
    this.successStory = successStory;
    this.resultPanel = new ResultPanel();
    this.progress = false;
}

Grid.prototype.setGameControls = function(gameControls) {
    this.gameControls = gameControls;
};

Grid.prototype.changeColor = function() {
    if(!this.noColours) {
        function generateRowAndCol() {
            const fieldNumber = parseInt(random(0, this.rows * this.cols), 10);
            const row = parseInt(fieldNumber / this.cols, 10);
            const col = fieldNumber % this.cols;
            return {row: row, col: col};
        }

        for (let i = 0; i < this.colorSize; i++) {
            const __ret = generateRowAndCol.call(this);
            const row = __ret.row;
            const col = __ret.col;
            let exists = false;
            for (let j = this.coloured.length - 1; j >= 0; j--) {
                if (col === this.coloured[j].col && row === this.coloured[j].row) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                this.coloured[i] = {row: row, col: col};
            }
            else {
                i--; // Retry
            }
        }
    }
};

Grid.prototype.removeColours = function() {
    this.coloured = [];
    this.clickHistory = [];
    this.noColours = true;
};

Grid.prototype.activateColours = function() {
    this.drawClick = false;
    this.noColours = false;
};

Grid.prototype.display = function() {
    const elementWidth = (width - 1) / this.cols;
    const elementHeight = (height - 1) / this.rows;
    const grid = this;
    const historyElements = [];
    for (let x = 0; x < this.rows; x++) {
        for (let y = 0; y < this.cols; y++) {
            let colorFill = color("#45b9c6");
            const xa = elementWidth * x + 1;
            const ya = elementHeight * y + 1;

            if(!this.drawClick) {
                this.coloured.forEach(function (rowCol) {
                    if (rowCol.row === x && rowCol.col === y) {
                        colorFill = grid.randomColour();
                        historyElements.push({col: x, row: y, color: colorFill});
                    }
                });
            }
            else { // Draw the clicks
                const xb = xa + elementWidth - 1;
                const yb = ya + elementWidth - 1;
                for(let i = 0; i < this.clickHistory.length; i++) {
                    const coords = this.clickHistory[i];
                    if (coords.mouseX > xa && coords.mouseY > ya && coords.mouseX < xb && coords.mouseY < yb) {
                        colorFill = coords.clickColor;
                        historyElements.push({col: x, row: y, color: colorFill});
                    }
                }
            }
            this.drawPrimitive(colorFill, xa, ya, elementWidth, elementHeight);
        }
    }
    this.gameHistory.drawHistoryInsert(historyElements);
};

Grid.prototype.drawPrimitive = function(colorFill, xa, ya, elementWidth, elementHeight) {
    fill(colorFill);
    noStroke();
    ellipse(xa + elementWidth / 2, ya + elementWidth / 2, (elementWidth - 1) * 0.50);
};

Grid.prototype.randomColour = function() {
    const randomVar = parseInt(random(0, this.colours.length), 10);
    return color(this.colours[randomVar]);
};

Grid.prototype.mouseRelease = function() {
    if(this.drawClick) {
        this.coloured = [];
        this.clickHistory.push({mouseX: mouseX, mouseY: mouseY, clickColor: this.clickColor});
        loop();
        noLoop();
        this.checkGuess();
    }
};

Grid.prototype.checkGuess = function() {
    const drawHistory = this.gameHistory.drawHistory;

    function removeAdjacentDuplicates() {
        let last = drawHistory[drawHistory.length - 1];
        let previousDraw = null;
        for (let i = last.length - 1; i >= 0; i--) {
            const currentDraw = last[i];
            if(previousDraw !== null && !currentDraw.guess && previousDraw.col === currentDraw.col && previousDraw.row === currentDraw.row) {
                last.splice(i, 1);
            }
            previousDraw = currentDraw;
        }
    }

    function findLastGuessTarget() {
        let guess = null;
        for (let i = drawHistory.length - 1; i >= 0; i--) {
            const entry = drawHistory[i];
            if (entry.guess) {
                guess = entry;
                break;
            }
        }
        return guess;
    }

    function sameColor(col1, col2) {
        return col1.levels.every(function (level, i) {
            return col2.levels[i] === level;
        });
    }

    function checkCorrect() {
        const correctArray = [];
        guess.forEach(function (g) {
            let correct = false;
            for (let j = 0; j < lastTry.length; j++) {
                const lt = lastTry[j];
                correct = g.row === lt.row && g.col === lt.col
                    && sameColor(g.color, lt.color);
                if (correct) {
                    break;
                }
            }
            correctArray.push(correct);
        });
        return correctArray;
    }

    function processSuccessError(grid) {
        const correctArray = checkCorrect();
        const success = correctArray.every(function(b) {return b});
        successStory.pushResult(success);
        if(success) {
            grid.gameControls.printSuccess();
        }
        else {
            grid.gameControls.printError();
        }
        grid.progress = true;
        grid.resultPanel.update(successStory.successCount(), successStory.failCount());
    }

    removeAdjacentDuplicates();

    const guess = findLastGuessTarget();
    const lastTry = drawHistory[drawHistory.length - 1];

    if(guess.length === lastTry.length) {
        processSuccessError(this);
    }
};

Grid.prototype.progressLevel = function() {
    if(this.progress) {
        const grid = this;
        successStory.progressLevel(function () {
            if (grid.colorSize + 1 < (grid.rows * grid.cols) / 2) {
                grid.colorSize += 1;
            }
            else {
                grid.colorSize = 2;
                grid.cols = grid.rows += 1;
            }
        });
        grid.progress = false;
    }
};

Grid.prototype.activateClickMode = function(clickColor) {
    this.drawClick = true;
    this.clickColor = clickColor;
};