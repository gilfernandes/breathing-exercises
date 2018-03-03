class Player {
  constructor(tiles, id) {
    this._spot = 0;
    this.dice = new Dice(this, tiles);
    this.tiles = tiles;
    this._finished = false;
    this._id = id;
  }

  show() {
    this.dice.createUI();
    this.generateColor();
    if(!this._finished) {
      const tile = this.tiles[this._spot];
      const pos = tile.center();
      noStroke();
      fill(color(this.color));
      ellipse(pos.x, pos.y, tile.wh * 0.8);
      fill(color(255));
      textSize(26);
      textAlign(CENTER, CENTER);
      text(this._id, pos.x, pos.y);
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
    document.getElementById("diceButton" + this._id).disabled = true;
    createDiv(`Player ${this._id} won the game!`).class("finished");
  }

  set spot(value) {
    this._spot = value;
    if(this._spot >= this.tiles.length - 1) {
      this._finished = true;
      // hide the players
      sl.processFinish();
    }
  }

  get spot() {
    return this._spot;
  }

  get finished() {
    return this._finished;
  }

  get id() {
    return this._id;
  }
}