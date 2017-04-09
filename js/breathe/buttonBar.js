function ButtonBar(inhaleTime, exhaleTime) {
    this.allButtons = [];
    this.inhaleTime = inhaleTime;
    this.exhaleTime = exhaleTime;
}

ButtonBar.prototype.createButtons = function () {
    var div = createDiv("");
    const buttonDivId = "buttonDiv";
    div.attribute("id", buttonDivId);
    const buttonBar = this;
    this.allButtons.push(createButton("4s").parent(buttonDivId).mousePressed(function () {
        buttonBar.highlightButton(buttonBar.allButtons[0]);
        restartAnimation(4, 4);
    }));
    this.allButtons.push(createButton("5s").parent(buttonDivId).mousePressed(function () {
        buttonBar.highlightButton(buttonBar.allButtons[1]);
        restartAnimation(5, 5);
    }));
    this.allButtons.push(createButton("8s").parent(buttonDivId).mousePressed(function () {
        restartAnimation(8, 8);
        buttonBar.highlightButton(buttonBar.allButtons[2]);
    }));
    this.allButtons.push(createButton("10s").parent(buttonDivId).mousePressed(function () {
        restartAnimation(10, 10);
        buttonBar.highlightButton(buttonBar.allButtons[3]);
    }));
    this.allButtons.push(createButton("12s").parent(buttonDivId).mousePressed(function () {
        restartAnimation(12, 12);
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