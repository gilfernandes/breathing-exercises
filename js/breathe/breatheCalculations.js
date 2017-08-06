
const breatheCalculations = function() {
    const res = {};

    res.calcDistance = function(totalSeconds, totalDist, frameRate) {
        const distPerSecond = totalDist /  totalSeconds;
        return distPerSecond / frameRate;
    };

    return res;
}();