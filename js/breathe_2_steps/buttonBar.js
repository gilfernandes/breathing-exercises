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
    const heightInPixels = "height: " + this.buttonHeight + "px";
    const button4 = createButton("4s").id("4s");
    document.getElementById("4s").style = heightInPixels;
    document.getElementById(this.divId).style = heightInPixels;
    this.allButtons.push(button4.parent(this.divId).mousePressed(function () {
        buttonBar.highlightButton(buttonBar.allButtons[0]);
        buttonBar.startAnimation(4, 4);
    }));
    this.allButtons.push(createButton("5s").parent(this.divId).mousePressed(function () {
        buttonBar.highlightButton(buttonBar.allButtons[1]);
        buttonBar.startAnimation(5, 5);
    }));
    this.allButtons.push(createButton("8s").parent(this.divId).mousePressed(function () {
        buttonBar.startAnimation(8, 8);
        buttonBar.highlightButton(buttonBar.allButtons[2]);
    }));
    this.allButtons.push(createButton("10s").parent(this.divId).mousePressed(function () {
        buttonBar.startAnimation(10, 10);
        buttonBar.highlightButton(buttonBar.allButtons[3]);
    }));
    this.allButtons.push(createButton("12s").parent(this.divId).mousePressed(function () {
        buttonBar.startAnimation(12, 12);
        buttonBar.highlightButton(buttonBar.allButtons[4]);
    }));
    buttonBar.highlightButton(buttonBar.allButtons[0]);
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