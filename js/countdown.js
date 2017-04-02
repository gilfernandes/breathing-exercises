function CountDown(time) {
    this.originalTime = time;
    this.time = time;
    this.started = false;
    this.interval = null;
}

CountDown.prototype.start = function () {
    this.started = true;
    var countDown = this;
    this.interval = setInterval(function() {
        countDown.time--;
        if(countDown.isExpired()) {
            clearInterval(countDown.interval);
        }
    }, 1000);
};

CountDown.prototype.reset = function () {
    this.time = this.originalTime;
    countDown.started = false;
};

CountDown.prototype.isExpired = function () {
    return this.time <= 0;
};

CountDown.prototype.callback = function (callbackFun1, callbackFun2) {
    if(!this.started) {
        this.start();
    }
    else if (this.isExpired()) {
        callbackFun1();
    }
    else {
        callbackFun2();
    }
};