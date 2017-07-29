function BreatheText(color, textSize, height) {
    this.color = color;
    this.textSize = textSize;
    this.height = height;
}

BreatheText.prototype.initDiv = function () {
    const messageDivId = "messageDiv";
    createDiv("<div id='counter'></div>").parent(messageDivId);
    createDiv("<div id='breatheMessage'></div>").parent(messageDivId);
    document.getElementById(messageDivId).style="height: " + this.height + "px";
};

BreatheText.prototype.displayText = function (message) {
    document.getElementById("counter").innerHTML = counter.counter;
    document.getElementById("breatheMessage").innerHTML = message;
};