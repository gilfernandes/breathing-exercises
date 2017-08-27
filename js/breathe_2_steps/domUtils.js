const domUtils = (function () {
    const pub = {};
    pub.hide = function (id) {
        if(this.exists(id)) {
            document.getElementById(id).style.display = "none";
        }
    };

    pub.show = function (id) {
        if(this.exists(id)) {
            document.getElementById(id).style.display = "block";
        }
    };

    pub.exists = function(id) {
        return document.getElementById(id);
    };

    return pub;
}());

