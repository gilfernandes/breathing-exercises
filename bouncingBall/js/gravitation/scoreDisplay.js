function ScoreDisplay(message, x, y) {
    this.remainingMessage = "";
    this.collidedMessage = "";
    this.statusMessage = "Try to shoot the burger offscreen. Use 'Space' to shoot the balls";
    this.x = x;
    this.y = y;
}

ScoreDisplay.prototype.setMessage = function (movers) {
    let dead = movers.length;
    let collidedCount = 0;
    for(let i = 0; i < movers.length; i++) {
        dead -= movers[i].dead ? 1 : 0;
        collidedCount += movers[i].isCollided();
    }
    this.remainingMessage = `${dead} balls remaining.`;
    this.collidedMessage = `${collidedCount} hits.`;
};

ScoreDisplay.prototype.display = function () {
    textSize(32);
    text(this.remainingMessage, this.x, this.y);
    text(this.collidedMessage, this.x, this.y + 40);
    textSize(16);
    text(this.statusMessage, this.x, this.y + 80);
};

ScoreDisplay.prototype.changeStatusMessage = function (statusMessage) {
    this.statusMessage = statusMessage;
};