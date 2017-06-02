let movers;

let a;

let scoreDisplay;

let food;

const numMovers = 50;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    a = new Attractor(40, new Sprite("assets/images/onca_crianca.png"));
    movers = [];
    const baseDist = 50;
    xoff = 0;
    yoff = 0;
    xred = 0;
    yred = 0;

    function genColor(xoff, yoff) {
        return map(noise(xoff, yoff), 0, 1, 0, 255);
    }

    for(let i = 0; i < numMovers; i++) {
        const distChange = map(noise(xoff, yoff), 0, 1, 5,10);
        const col = color(genColor(xred, yred), genColor(xoff, yoff), genColor(xoff, yoff));
        xoff += 0.04;
        yoff += 0.06;
        xred += 0.03;
        yred += 0.03;
        movers.push(new Mover(createVector(width / 4 + baseDist + distChange, height / 2 + baseDist + distChange),
            createVector(0.2, 0),
            createVector(-2, 2), col));
    }
    imageMode(CENTER);
    scoreDisplay = new ScoreDisplay("", 10, 40);
    food = new Food(new Sprite("assets/images/burger1.png"), window.innerWidth, scoreDisplay);
}

function processMovers() {
    movers.forEach(function (m) {
        const force = a.attract(m);
        m.applyForce(force);
        m.update();
        m.detectCollision(food);
        m.checkEdges();
    });

    a.drag();
    a.hover(mouseX, mouseY);

    a.display();
    movers.forEach(function (m) {
        m.display();
    });
}
function draw() {
    background(255);

    processMovers();

    scoreDisplay.setMessage(movers);
    scoreDisplay.display();

    food.move();
    food.display();
}

function mousePressed() {
    a.clicked(mouseX,mouseY);
}

function mouseReleased() {
    a.stopDragging();
}

function keyPressed() {
    if(keyCode === 32) {
        const aliveMovers = movers.filter(function(m) { return !m.isDead() });
        const selectedMover = int(random(0, aliveMovers.length));
        aliveMovers[selectedMover].shootMe();
    }
}