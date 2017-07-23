function ResultPanel() {
    createDiv("<div id='resultPanel'></div>");
    this.display = true;
}

ResultPanel.prototype.update = function(successCount, failCount) {
    if(this.display) {
        document.getElementById("resultPanel").style['display'] = 'block';
        document.getElementById("resultPanel").innerHTML = "";
        const scoreInfo = `<div id="resultPanelGrid"><span class="successful">${successCount}</span><span class="sep">/</span><span class="failed">${failCount}</span></div>`;
        const label = "<div id='yourScore'>Your Score</div>";
        createDiv(scoreInfo + label).parent("resultPanel");
    }
};