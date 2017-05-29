function ResultPanel() {
    createDiv("<div id='resultPanel'></div>");
    this.display = false;
}

ResultPanel.prototype.update = function(successCount, failCount) {
    if(this.display) {
        document.getElementById("resultPanel").style['display'] = 'block';
        document.getElementById("resultPanel").innerHTML = "";
        createDiv(`<div>OK: ${successCount}</div><div>Fail: ${failCount}</div>`).parent("resultPanel");
    }
};