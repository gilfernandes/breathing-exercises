function StartButton(animationControl) {
    this.id = "restartButton";
    this.animationControl = animationControl;
}

StartButton.prototype.show = function() {
    if(domUtils.exists(this.id)) {
        domUtils.show(this.id);
    }
    else {
        const startButton = this;
        createButton("Restart").id(this.id).mouseReleased(function() {
            startButton.animationControl.clearAnimation(startButton.animationControl.p5MainCanvas);
        });
    }
};

StartButton.prototype.hide = function() {
    domUtils.hide(this.id);
};