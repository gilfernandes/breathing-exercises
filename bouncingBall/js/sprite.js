function Sprite(imgPath) {
    this.sprite = loadImage(imgPath);
}

Sprite.prototype.draw = function(x, y) {
    image(this.sprite, x, y);
};