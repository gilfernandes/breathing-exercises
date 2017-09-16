function MultiCircles(startWidth, targetWidth, count, colour) {
    this.startWidth = startWidth;
    this.targetWidth = targetWidth;
    this.count = count;
    this.colour = colour;
    this.increment = (targetWidth - startWidth) / count;

}

MultiCircles.prototype.draw = function () {
    for (let i = 0; i < this.count; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, " + ((i * 0.4) / this.count) + ")";
        let r = (this.startWidth + this.increment * i ) / 2;
        ctx.ellipse(0, 0, r, r, 45 * Math.PI / 180, 0, 2 * Math.PI);
        ctx.fill();
    }
};