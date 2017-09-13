function ButtonBar(inhaleTime, exhaleTime, buttonHeight) {
    this.allButtons = [];
    this.inhaleTime = inhaleTime;
    this.exhaleTime = exhaleTime;
    this.buttonHeight = buttonHeight;
}

ButtonBar.prototype.createButtons = function () {
    let div = createDiv("");
    const buttonDivId = "buttonDiv";
    div.attribute("id", buttonDivId);
    const buttonBar = this;
    const button4 = createButton("4s").id("4s");
    this.allButtons.push(button4.parent(buttonDivId).mousePressed(function () {
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

    function highlightFirst() {
        buttonBar.highlightButton(buttonBar.allButtons[0]);
        let defaultButtons = document.getElementsByClassName("activeB");
        if (defaultButtons.length > 0) {
            defaultButtons[0].focus();
        }
    }

    highlightFirst();
};

ButtonBar.prototype.highlightButton = function (activeButton) {
    this.allButtons.forEach(function (button) {
        button.removeClass("activeB");
    });
    activeButton.addClass("activeB");
};