function Grid(rows, cols, colorSize, colours, gameHistory) {
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
}

Grid.prototype.changeColor = function() {
    if(!this.noColours) {
        function generateRowAndCol() {
            const fieldNumber = parseInt(random(0, this.rows * this.cols), 10);
            const row = parseInt(fieldNumber / this.cols, 10);
            const col = fieldNumber % this.cols;
            return {row: row, col: col};
        }

        for (var i = 0; i < this.colorSize; i++) {
            var __ret = generateRowAndCol.call(this);
            var row = __ret.row;
            var col = __ret.col;
            var exists = false;
            for (var j = this.coloured.length - 1; j >= 0; j--) {
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
    this.noColours = false;
};

Grid.prototype.display = function() {
    const elementWidth = (width - 1) / this.cols;
    const elementHeight = (height - 1) / this.rows;
    const grid = this;
    const historyElements = [];
    for (var x = 0; x < this.rows; x++) {
        for (var y = 0; y < this.cols; y++) {
            var colorFill = color(255);
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
                for(var i = 0; i < this.clickHistory.length; i++) {
                    const coords = this.clickHistory[i];
                    if (coords.mouseX > xa && coords.mouseY > ya && coords.mouseX < xb && coords.mouseY < yb) {
                        colorFill = coords.clickColor;
                        historyElements.push({col: x, row: y, color: colorFill});
                    }
                }
            }
            fill(colorFill);
            noStroke();
            rect(xa, ya, elementWidth - 1, elementHeight - 1);
        }
    }
    console.log(this.gameHistory);
    this.gameHistory.drawHistoryInsert(historyElements);
    this.drawClick = false;
};

Grid.prototype.randomColour = function() {
    const randomVar = parseInt(random(0, this.colours.length), 10);
    console.log(this.colours);
    return color(this.colours[randomVar]);
};

Grid.prototype.mouseRelease = function() {
    if(this.drawClick) {
        this.coloured = [];
        this.clickHistory.push({mouseX: mouseX, mouseY: mouseY, clickColor: this.clickColor});
        loop();
        noLoop();
    }
};

Grid.prototype.activateClickMode = function(clickColor) {
    this.drawClick = true;
    this.clickColor = clickColor;
};