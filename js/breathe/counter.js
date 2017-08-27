function Counter() {
    this.counter = 0;
    this.interval = null;
    this.fun = null;
}

Counter.prototype.start = function (fun) {
    if(this.interval) {
        this.stop();
    }
    this.interval = setInterval(fun, 1000);
    this.fun = fun;
};

Counter.prototype.reset = function () {
    this.stop();
    this.start(this.fun);
};

Counter.prototype.stop = function() {
    clearInterval(this.interval);
    this.counter = 0;
};