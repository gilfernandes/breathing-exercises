const sl = {
  tiles: [],
  resolution: 10,
  started: false,
  createDimension: function () {
    const widthLarger = window.innerWidth > window.innerHeight;
    if (widthLarger) {
      const size = window.innerHeight * 9 / 10;
      return {width: size, height: size};
    }
    else {
      const size = window.innerWidth * 9 / 10;
      return {width: size, height: size};
    }
  }
};

function askHowManyPlayers() {
  const playerNumDiv = createDiv("").id("playerNumDiv");
  createSpan("How many players? ").id("playerNumQuestion").parent(playerNumDiv);
  createInput("1").id("playerNumInput").parent(playerNumDiv);

  createSpan(" ").parent(playerNumDiv);
  const playerNumButton = createButton("Start").parent(playerNumDiv);
  // handle also ENTER event.
  document.getElementById("playerNumInput").onkeydown = function(e) {
    if(event.keyCode === 13) {
      processPlayerNum()
    }
  };
  function processPlayerNum() {
    const playerNumInput = document.getElementById("playerNumInput");
    const playerNum = playerNumInput.value;
    if (playerNum !== null && playerNum.match(/^\d+$/)) {
      sl.players = [];
      for (let i = 1; i <= playerNum; i++) {
        sl.players.push(new Player(sl.tiles, i));
      }
      sl.started = true;
      document.getElementById("playerNumDiv").style.display = "none";
      loop();
    }
    else {
      const playerNumError = document.getElementById("playerNumError");
      const errMessage = `Not a valid number: '${playerNum}'`;
      if(!playerNumError) {
        createDiv(errMessage).id("playerNumError").parent(playerNumDiv);
      }
      else {
        playerNumError.textContent = errMessage;
      }
    }
  }

  playerNumButton.mousePressed(processPlayerNum);
}

sl.placeQualities = function (cols, qualities) {
  const positions = [];

  function exists(position) {
    return positions.some(p => p === position);
  }

  for (let quality of qualities) {
    quality.calculateBoost(sl.resolution);
    let position = -1;
    do {
      position = floor(random(cols, sl.tiles.length - 1));
    } while (exists(position) || !quality.place(position, sl.resolution));
    positions.push(position);
    sl.tiles[quality.start].quality = quality;
  }
};

sl.placeVirtuesAndWeaknesses = function () {
  sl.placeQualities(sl.resolution, virtues);
  sl.placeQualities(sl.resolution, weaknesses);
};

sl.createBoard = function () {
  const w = width - 1;
  const h = width - 1;
  const resolution = w / sl.resolution;
  const cols = w / resolution;
  const rows = h / resolution;
  for (let i = 0, x = 0, y = (rows - 1) * resolution, dir = 1; i < cols * rows; i++) {
    if (x >= w - 1 || x < -1) {
      dir *= -1;
      y -= resolution;
      x += resolution * dir;
    }
    const tile = new Tile(x, y, resolution, i, i + 1);
    x += resolution * dir;
    sl.tiles.push(tile);
  }
};