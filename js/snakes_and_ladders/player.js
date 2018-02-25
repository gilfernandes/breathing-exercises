class Player {

  constructor(tiles) {
    this._spot = 0;
    this.dice = new Dice(this);
    this.tiles = tiles;
  }

  show() {
    this.dice.createUI();
    const pos = this.tiles[this._spot].center();
    noStroke();
    fill(color(255));
    ellipse(pos.x, pos.y, 50);
  }

  roll() {
    this.dice.roll();
  }

  set spot(value) {
    this._spot = value;
  }

  get spot() {
    return this._spot;
  }
}