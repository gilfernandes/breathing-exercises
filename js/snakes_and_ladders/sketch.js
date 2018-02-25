function setup() {
  const dim = sl.createDimension();
  createCanvas(dim.width, dim.height);
  sl.createBoard();
  sl.placeVirtuesAndWeaknesses();
}

function draw() {
  for (let tile of sl.tiles) {
    tile.show();
  }
  for (let tile of sl.tiles) {
    tile.displayQuality();
  }
  for (let player of sl.players) {
    player.show();
  }
  noLoop();
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