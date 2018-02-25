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
  sl.player.show();
  noLoop();
}