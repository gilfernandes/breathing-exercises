function KnightRider(width, height, totalWidth) {
    this.position = 0;
    this.speed = 3;
    this.dir = 1;
    this.width = width;
    this.totalWidth = totalWidth;
    this.height = height;
    this.halted = false;
}

KnightRider.prototype.animate = function () {
    if (this.position < 0 || this.position + this.width > this.totalWidth) {
        this.dir *= -1;
    }
    this.position += this.speed * this.dir;
};

KnightRider.prototype.draw = function (canvas) {
    canvas.background(60);
    canvas.noStroke();
    canvas.fill(255, 255, 255);
    canvas.rect(this.position, 0, this.width, this.height);
};

KnightRider.prototype.stop = function () {
    this.halted = true;
};

let initKnightRiderCanvas = function (p) {

    p.setup = function () {
        p.createCanvas(window.innerWidth, knightRider.height).id("progressCanvas");
        p.background(255);
    };

    p.draw = function () {
        knightRider.animate();
        knightRider.draw(p);
        if(this.halted) {
            p.noLoop();
        }
    };

};