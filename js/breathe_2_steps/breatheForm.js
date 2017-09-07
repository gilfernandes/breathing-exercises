function BreatheForm() {

}

BreatheForm.prototype.createForm = function () {
    let div = createDiv("").id("breatheForm");
    createSpan("Seconds: ").parent("breatheForm");
    let breatheList = createSelect().parent("breatheForm").id("breatheSeconds");
    ["120", "180", "240"].forEach(function(entry) {
        breatheList.option(entry);
    });
};

BreatheForm.prototype.hideForm = function () {
    document.getElementById("breatheForm").style.display = "none";
};

BreatheForm.prototype.getSeconds = function () {
    return document.getElementById("breatheSeconds").value ?
        parseInt(document.getElementById("breatheSeconds").value) : totalTime;
};