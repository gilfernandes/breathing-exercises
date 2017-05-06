let grid;

let gameControls;

let gameHistory;

let successStory;

let doubleClickLock;

const createMemoryCanvas = function () {
    const ratio = 0.75;
    const width = window.innerWidth < window.innerHeight ? window.innerWidth * ratio : window.innerHeight * ratio;
    const canvas = createCanvas(width, width);
    canvas.parent("#mainDiv");
    return canvas;
};

function setup() {
    canvas = createMemoryCanvas();
    noLoop();
    gameHistory = new GameHistory();
    successStory = new SuccessStory(2);
    grid = new Grid(4, 4, 2, ["#ff0000", "#00ff00", "#0000ff"], gameHistory, successStory);
    gameControls = new GameControls(grid, gameHistory, successStory);
    gameControls.init();

    gameControls.animate();

    canvas.mouseReleased(function () {
        if(!doubleClickLock) {
            doubleClickLock = true;
            if (!gameControls.animationOn) {
                grid.mouseRelease();
            }
            setTimeout(function() {doubleClickLock = false}, 400);
        }
    });
}

function draw() {
    background(255);
    grid.changeColor();
    grid.display();
}