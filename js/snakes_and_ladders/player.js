class Player {

  constructor(tiles, id) {
    this._spot = 0;
    this.dice = new Dice(this, tiles);
    this.tiles = tiles;
    this._finished = false;
    this.id = id;
  }

  show() {
    this.dice.createUI();
    this.generateColor();
    if(!this._finished) {
      const pos = this.tiles[this._spot].center();
      noStroke();
      fill(color(this.color));
      ellipse(pos.x, pos.y, 50);
      fill(color(255));
      textSize(26);
      textAlign(CENTER, CENTER);
      text(this.id, pos.x, pos.y);
    }
  }

  generateColor() {
    if(!this.color) {
      let random255 = function () {
        return floor(random(255));
      };
      this.color = color(random255(), random255(), random255());
    }
  }

  showFinished() {
    document.getElementById("diceButton" + this.id).disabled = true;
    createDiv(`Player ${this.id} finished the game!`).class("finished");
  }

  set spot(value) {
    this._spot = value;
    if(this._spot >= this.tiles.length - 1) {
      this._finished = true;
    }
  }

  get spot() {
    return this._spot;
  }

  get finished() {
    return this._finished;
  }
}