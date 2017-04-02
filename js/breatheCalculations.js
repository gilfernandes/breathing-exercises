
const breatheCalculations = function() {
    var res = {};

    res.calcDistance = function(totalSeconds, totalDist, frameRate) {
        const distPerSecond = totalDist /  totalSeconds;
        var distPerFrame = distPerSecond / frameRate;
        return distPerFrame;
    };

    return res;
}();