function ResultPanel() {
    createDiv("<div id='resultPanel'></div>");
}

ResultPanel.prototype.update = function(successCount, failCount) {
    document.getElementById("resultPanel").style['display'] = 'block';
    document.getElementById("resultPanel").innerHTML = "";
    createDiv(`<div>OK: ${successCount}</div><div>Fail: ${failCount}</div>`).parent("resultPanel");
};