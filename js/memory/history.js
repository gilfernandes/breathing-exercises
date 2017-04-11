
function GameHistory() {
    this.clickHistory = [];
    this.drawHistory = [];
}

GameHistory.prototype.drawHistoryInsert = function(record) {
    if(record !== null && record.length > 0) {
        this.drawHistory.push(record);
    }
};

GameHistory.prototype.drawHistoryClear = function() {
    this.drawHistory = [];
};

GameHistory.prototype.drawHistoryGetLast = function() {
    return this.drawHistory[this.drawHistory.length - 1];
};