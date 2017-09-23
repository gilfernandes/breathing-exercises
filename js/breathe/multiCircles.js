function MultiCircles(startWidth, count, canvasSize) {
    this.startWidth = startWidth;
    this.count = count;
    this.increment = (canvasSize - startWidth) / count;
    this.widthMinusLast = (this.startWidth + this.increment * (this.count - 1));
}

MultiCircles.prototype.getWidthMinusLast = function() {
    return this.widthMinusLast + 9;
};

MultiCircles.prototype.draw = function () {
    const alphaIndent = 1 / this.count;
    for (let i = 1; i <= this.count; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, " + alphaIndent + ")";
        let r = (this.startWidth + this.increment * i ) / 2;
        ctx.ellipse(0, 0, r, r, 45 * Math.PI / 180, 0, 2 * Math.PI);
        ctx.fill();
    }
};