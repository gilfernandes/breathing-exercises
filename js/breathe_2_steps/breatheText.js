function BreatheText(color, textSize, height) {
    this.color = color;
    this.textSize = textSize;
    this.height = height;
}

BreatheText.prototype.initDiv = function () {
    if(document.getElementById("counter") && document.getElementById("breatheMessage")) {
        domUtils.show("counter");
        domUtils.show("breatheMessage");
    }
    else {
        const messageDivId = "messageDiv";
        const counterDiv = createDiv("<div id='counter'></div>");
        const messageDivIdExists = document.getElementById(messageDivId);
        if (messageDivIdExists) {
            counterDiv.parent(messageDivId);
        }
        const breatheMessageDiv = createDiv("<div id='breatheMessage'></div>");
        if (messageDivIdExists) {
            breatheMessageDiv.parent(messageDivId);
            document.getElementById(messageDivId).style = "height: " + this.height + "px";
        }
    }
};

BreatheText.prototype.displayText = function (message) {
    document.getElementById("counter").innerHTML = counter.counter;
    document.getElementById("breatheMessage").innerHTML = message;
};