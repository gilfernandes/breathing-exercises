function setup() {
  const dim = sl.createDimension();
  createCanvas(dim.width, dim.height);
  sl.createBoard();
}

function draw() {
  for (let tile of sl.tiles) {
    tile.show();
  }
  sl.player.show();
  sl.placeVirtuesAndWeaknesses();
  noLoop();
}