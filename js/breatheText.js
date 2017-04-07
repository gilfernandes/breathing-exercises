

function BreatheText(color, textSize, hAlign, vAlign) {
    this.color = color;
    this.hAlign = hAlign;
    this.vAlign = vAlign;
    this.textSize = textSize;
}

BreatheText.prototype.print = function (textToPrint) {
    textSize(this.textSize);
    fill(color(this.color));
    textAlign(this.hAlign, this.vAlign);
    text(textToPrint, 0, 0);
};