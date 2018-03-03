function setup() {
  const dim = sl.createDimension();
  sl.askHowManyPlayers();
  createCanvas(dim.width, dim.height);
  noLoop();
  sl.createBoard();
  sl.placeVirtuesAndWeaknesses();
}

function draw() {
  if(sl.started) {
    for (let tile of sl.tiles) {
      tile.show();
    }
    for (let tile of sl.tiles) {
      tile.displayQuality();
    }
    for (let player of sl.players) {
      player.show();
    }
    const groupedPlayers = util.groupBy(sl.players, 'spot');
    for(let tile in groupedPlayers) {
      if(typeof tile !== "undefined") {
        const playerArray = groupedPlayers[tile];
        if(playerArray.length > 1) {
          sl.tiles[tile].displayMultiplayers(playerArray);
        }
      }
    }
    noLoop();
  }
}

function mousePressed() {
  // Check if mouse is inside the circle
  for (let tile of sl.tiles) {
    if (tile.containsPoint(mouseX, mouseY) && tile.quality) {
      tile.quality.displayDetails();
      break;
    }
  }

}