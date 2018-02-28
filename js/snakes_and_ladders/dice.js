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
    if (!this.diceRolling) {
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
    if (currentTile.quality) {
      const boost = currentTile.quality.boost;
      this.movePosition(boost);
    }
  }

  throwDice() {
    this.value = floor(random(1, this.faces));
  }

  show() {
    const diceDiv = this.diceDiv;
    if (diceDiv) {
      diceDiv.html(this.value);
    }
  }

  createUI() {
    const playerId = this.player.id;
    if (!document.getElementById("dice" + playerId)) {
      createDiv(`Player ${playerId}`).id("playerTitle" + playerId);
      this.diceDiv = createDiv('').id("dice" + playerId).class("dice");
      const buttonId = "diceButton" + playerId;
      const button = createButton('Roll dice').id(buttonId);
      document.getElementById(buttonId).disabled = !(playerId === sl.currentPlayer);
      const dice = this;
      button.mousePressed(function () {
        dice.roll();
        sl.currentPlayer = (sl.currentPlayer) % sl.players.length + 1;
        dice.activateButtons(buttonId);
      });
    }
  }

  activateButtons() {
    for (let player of sl.players) {
      const buttonId = "diceButton" + player.id;
      const active = player.id === sl.currentPlayer;
      document.getElementById(buttonId).disabled = !(active);
      this.addArrow(player.id, active);
    }
  }

  addArrow(playerId, active) {
    const playerTitleId = "playerTitle" + playerId;
    const textContent = document.getElementById(playerTitleId).textContent;
    if(active) {
      document.getElementById(playerTitleId).textContent = "\u27a1" + textContent
    }
    else {
      document.getElementById(playerTitleId).textContent = textContent.replace(/[\u27a1]/g, "");
    }
  }
}