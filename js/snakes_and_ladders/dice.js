class Dice {

  constructor(player, tiles) {
    this.value = 1;
    this.faces = 6;
    this.diceDiv = null;
    this.player = player;
    this.tiles = tiles;
    this.diceRolling = false;
  }

  roll() {
    if(!this.diceRolling) {
      this.diceRolling = true;
      let times = 10;
      const dice = this;
      this.diceDiv.style("color: #aaaaaa");
      const rollingInterval = setInterval(function () {
        if (times > 0) {
          dice.throwDice();
          dice.show();
          times--;
        }
        else {
          clearInterval(rollingInterval);
          dice.diceDiv.style("color: black");
          dice.movePosition(dice.value);
          if (dice.player.finished) {
            dice.player.showFinished();
          }
          else {
            dice.correctIfQuality(dice.player.spot);
          }
          dice.diceRolling = false;
        }
      }, 100);
    }
  }

  movePosition(value) {
    this.player.spot = this.player.spot + value;
    loop();
    this.player.show();
    noLoop();
  }

  correctIfQuality(index) {
    const currentTile = this.tiles[index];
    if(currentTile.quality) {
      const boost = currentTile.quality.boost;
      this.movePosition(boost);
    }
  }

  throwDice() {
    this.value = floor(random(1, this.faces));
  }

  show() {
    const diceDiv = this.diceDiv;
    if(diceDiv) {
      diceDiv.html(this.value);
    }
  }

  createUI() {
    if(!document.getElementById("dice" + this.player.id)) {
      createDiv(`Player ${this.player.id}`);
      this.diceDiv = createDiv('').id("dice" + this.player.id).class("dice");
      const button = createButton('Roll dice').id("diceButton" + this.player.id);
      const dice = this;
      button.mousePressed(function () {
        dice.roll();
      });
    }
  }
}