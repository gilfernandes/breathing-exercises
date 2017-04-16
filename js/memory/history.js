
function GameHistory() {
    this.clickHistory = [];
    this.drawHistory = [];
}

GameHistory.prototype.drawHistoryInsert = function(record) {
    if(record !== null && record.length > 0) {
        this.drawHistory.push(record);
    }
};

GameHistory.prototype.markGuessDrawHistory = function() {
    this.markDrawHistory("guess", true);
};

GameHistory.prototype.markGuessTryDrawHistory = function() {
    this.markDrawHistory("guessTry", true);
};

GameHistory.prototype.markDrawHistory = function(key, value) {
    if(this.drawHistory.length > 0) {
        this.drawHistory[this.drawHistory.length - 1][key] = value;
    }
};

GameHistory.prototype.drawHistoryClear = function() {
    this.drawHistory = [];
};

GameHistory.prototype.drawHistoryGetLast = function() {
    return this.drawHistory[this.drawHistory.length - 1];
};