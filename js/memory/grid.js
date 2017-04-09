function Grid(rows, cols, colorSize, colours) {
    this.rows = rows;
    this.cols = cols;
    this.colorSize = colorSize;
    this.coloured = [];
    this.colours = colours;
    this.noColours = false;
}

Grid.prototype.changeColor = function() {
    if(!this.noColours) {
        function generateRowAndCol() {
            var fieldNumber = parseInt(random(0, this.rows * this.cols), 10);
            var row = parseInt(fieldNumber / this.cols, 10);
            var col = fieldNumber % this.cols;
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
    this.noColours = true;
};

Grid.prototype.activateColours = function() {
    this.noColours = false;
};

Grid.prototype.display = function() {
    var elementWidth = (width - 1) / this.cols;
    var elementHeight = (height - 1) / this.rows;
    var grid = this;
    for (var x = 0; x < this.rows; x++) {
        for (var y = 0; y < this.cols; y++) {
            var colorFill = color(255);
            this.coloured.forEach(function(rowCol) {
                if(rowCol.row === x && rowCol.col === y) {
                    colorFill = grid.randomColour();
                }
            });
            fill(colorFill);
            noStroke();
            rect(elementWidth * x + 1, elementHeight * y + 1, elementWidth - 1, elementHeight-1);
        }
    }
};

Grid.prototype.randomColour = function() {
    const random2 = parseInt(random(0, 2), 10);
    return color(this.colours[random2]);
};