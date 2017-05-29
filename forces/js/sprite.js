function Sprite(imgPath) {
    this.sprite = loadImage(imgPath);
    this.width = 0;
    this.height = 0;
}

Sprite.prototype.draw = function(x, y, width, height) {
    image(this.sprite, x, y, width, height);
};

