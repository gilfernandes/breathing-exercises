function Sprite(imgPath) {
    this.sprite = loadImage(imgPath);
}

Sprite.prototype.draw = function(x, y, width, height) {
    image(this.sprite, x, y, width, height);
};