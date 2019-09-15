function GestureProcessor(elementId) {
    this.elementId = elementId;
}

GestureProcessor.prototype.init = function() {
    let hammerElement = document.getElementById(this.elementId);
    if (hammerElement) {
        let hammertime = new Hammer(hammerElement);

        hammertime.on('swipe', function (ev) {
            console.log("hammer: " + ev);
        });

        hammertime.get('swipe').set({direction: Hammer.DIRECTION_DOWN});
    }
    else {
        console.error("Could not find element to initialize: " + this.elementId);
    }
};

