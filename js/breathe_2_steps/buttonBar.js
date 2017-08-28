function ButtonBar(buttonHeight, animationControl) {
    this.allButtons = [];
    this.buttonHeight = buttonHeight;
    this.divId = "buttonDiv";
    this.animationControl = animationControl;
}

ButtonBar.prototype.createButtons = function () {
    let div = createDiv("");
    div.attribute("id", this.divId);
    const buttonBar = this;
    function createMenuButton(seconds, position) {
        buttonBar.allButtons.push(createButton(seconds + "s").id(seconds + "s").parent(buttonBar.divId).mousePressed(function () {
            buttonBar.highlightButton(buttonBar.allButtons[position]);
            buttonBar.startAnimation(seconds, seconds);
        }));
    }
    createMenuButton(4, 0);
    createMenuButton(5, 1);
    createMenuButton(8, 2);
    createMenuButton(10, 3);
    createMenuButton(12, 4);
};

ButtonBar.prototype.highlightButton = function (activeButton) {
    this.allButtons.forEach(function (button) {
        button.removeClass("activeB");
    });
    activeButton.addClass("activeB");
};

ButtonBar.prototype.startAnimation = function(inhaleTime, exhaleTime) {
    this.hideBar();
    this.animationControl.startAnimation(inhaleTime, exhaleTime);
};

ButtonBar.prototype.hideBar = function() {
    document.getElementById(this.divId).style.display = "none";
};