const gradients = function () {
    var res = {};

    res.Y_AXIS = 1;
    res.X_AXIS = 2;

    res.setGradient = function (x, y, w, h, c1, c2, axis) {

        noFill();

        if (axis == res.Y_AXIS) {  // Top to bottom gradient
            for (var i = y; i <= y + h; i++) {
                var inter = map(i, y, y + h, 0, 1);
                var c = lerpColor(c1, c2, inter);
                stroke(c);
                line(x, i, x + w, i);
            }
        }
        else if (axis == res.X_AXIS) {  // Left to right gradient
            for (var i = x; i <= x + w; i++) {
                var inter = map(i, x, x + w, 0, 1);
                var c = lerpColor(c1, c2, inter);
                stroke(c);
                line(i, y, i, y + h);
            }
        }
    };

    res.gradialRadient = function (x, y, c1, c2, radius) {
        var c = c1;
        for (var r = radius; r > 0; --r) {
            fill(c);
            ellipse(x, y, r * 2, r * 2);
            var inter = map(r, 0, radius, 0, 1);
            c = lerpColor(c1, c2, inter);
        }
    };

    res.elipseWithLinearGradient = function() {
        // TODO: finish this
    };

    return res;
}();

