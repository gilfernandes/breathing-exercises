
function SuccessStory(numberOfSuccessesToProceed) {
    this.history = [];
    this.numberOfSuccessesToProceed = numberOfSuccessesToProceed;
}

SuccessStory.prototype.pushResult = function (success) {
    this.history.push(success);
};

SuccessStory.prototype.countLastSuccesses = function () {
    var lastSuccess = 0;
    for(var i = this.history.length - 1; i >= 0; i--) {
        if(!this.history[i]) {
            break;
        }
        lastSuccess += 1;
    }
    return lastSuccess;
};

SuccessStory.prototype.progressLevel = function(fun) {
    if(this.countLastSuccesses() >= this.numberOfSuccessesToProceed) {
        fun();
    }
};

SuccessStory.prototype.successCount = function() {
    return this.history.reduce(function(c, b) { return c + (b ? 1 : 0) }, 0);
};

SuccessStory.prototype.failCount = function() {
    return this.history.reduce(function(c, b) { return c + (b ? 0 : 1) }, 0);
};