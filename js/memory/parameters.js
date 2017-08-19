function Parameters() {
    this.showTitle = location.search.indexOf("showTitle") > -1;
}

Parameters.prototype.processTitle = function() {
    if(this.showTitle) {
        document.getElementById("mainTitle").style.display = "block";
        document.getElementById("mainDiv").style.marginTop = "20px";
    }
};
