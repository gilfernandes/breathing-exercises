function BreatheText(color, textSize, hAlign, vAlign, textX, textY) {
    this.color = color;
    this.hAlign = hAlign;
    this.vAlign = vAlign;
    this.textSize = textSize;
    this.textX = textX;
    this.textY = textY;
}

BreatheText.prototype.print = function (textToPrint) {
    textSize(this.textSize);
    fill(color(this.color));
    textAlign(this.hAlign, this.vAlign);
    text(textToPrint, this.textX, this.textY);
};

BreatheText.prototype.displayText = function (message) {
    this.print(message);
    text(counter.counter, this.textX, this.textY - 100);
};