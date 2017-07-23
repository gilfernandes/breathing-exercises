function FooterProgress() {
    this.originalWidth = 100;
    this.width = this.originalWidth;
    this.timeStep = 100;
    this.remainingTime = 0;
}

FooterProgress.prototype.display = function () {
    document.getElementById("footerProgress").style["width"] = this.width + "%";
};

FooterProgress.prototype.startDescending = function(seconds) {
    const totalTime = seconds * 1000;
    const footerProgress = this;
    this.remainingTime = totalTime;
    const progressInterval = setInterval(function() {
        footerProgress.display();
        footerProgress.remainingTime -= footerProgress.timeStep;
        footerProgress.width = map(footerProgress.remainingTime, 0, totalTime, 0, 100);
        if(footerProgress.width < 0) {
            footerProgress.width = 0;
            footerProgress.display();
            clearInterval(progressInterval);
        }
    }, this.timeStep);

};

FooterProgress.prototype.reset = function() {
    this.width = 100;
    this.display();
};