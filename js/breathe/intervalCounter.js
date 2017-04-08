
// This is a debugging library for seeing how many intervals are available.

window.originalSetInterval = window.setInterval;
window.originalClearInterval = window.clearInterval;
window.activeIntervals = 0;
window.setInterval = function (func, delay)
{
    if(func && delay){
        window.activeIntervals++;
    }
    return window.originalSetInterval(func,delay);
};
window.clearInterval = function (intervalId)
{
    // JQuery sometimes hands in true which doesn't count
    if(intervalId !== true){
        window.activeIntervals--;
    }
    return window.originalClearInterval(intervalId);
};

function displayIntervals() {
    return setInterval(function() {
        console.log("Number of active intervals: " + window.activeIntervals);
    }, 1000)
}