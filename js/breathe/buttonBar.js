function ButtonBar(inhaleTime, exhaleTime, buttonHeight) {
    this.allButtons = [];
    this.inhaleTime = inhaleTime;
    this.exhaleTime = exhaleTime;
    this.buttonHeight = buttonHeight;
    this.fadeInActivated = true;
}

ButtonBar.prototype.createButtons = function () {
    let div = createDiv("");
    const buttonDivId = "buttonDiv";
    div.attribute("id", buttonDivId);
    const buttonBar = this;
    createDiv("Breath cycle time").parent(buttonDivId).id("buttonLegend");
    const buttonParent = createDiv("").parent(buttonDivId).id("buttonParent");
    this.allButtons.push(createButton("4s").id("4s").parent(buttonParent).mousePressed(function () {
        buttonBar.highlightButton(buttonBar.allButtons[0]);
        restartAnimation(4, 4);
    }));
    this.allButtons.push(createButton("5s").parent(buttonParent).mousePressed(function () {
        buttonBar.highlightButton(buttonBar.allButtons[1]);
        restartAnimation(5, 5);
    }));
    this.allButtons.push(createButton("8s").parent(buttonParent).mousePressed(function () {
        restartAnimation(8, 8);
        buttonBar.highlightButton(buttonBar.allButtons[2]);
    }));
    this.allButtons.push(createButton("10s").parent(buttonParent).mousePressed(function () {
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

ButtonBar.prototype.fadeOut = function (time) {
    const buttonBar = this;
    setTimeout(function () {
        buttonBar.fadeInActivated = false;
        jQuery("#buttonDiv").fadeOut();
    }, time);
};

ButtonBar.prototype.fadeIn = function (time) {
    if(!this.fadeInActivated) {
        this.fadeInActivated = true;
        jQuery("#buttonDiv").fadeIn();
        this.fadeOut(10000);
    }
};

