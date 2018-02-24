class Dice {

  constructor(player) {
    this.value = 1;
    this.faces = 6;
    this.diceDiv = null;
    this.player = player;
  }

  roll() {
    let time = 3000;
    const dice = this;
    this.diceDiv.style("color: #aaaaaa");
    const rollingInterval = setInterval(function() {
      dice.throwDice();
      dice.show();
    }, 100);
    setTimeout(function() {
      clearInterval(rollingInterval);
      dice.diceDiv.style("color: black");
      dice.player.spot = dice.player.spot + dice.value;
      loop();
      dice.player.show();
      noLoop();
    }, time);
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
    if(!document.getElementById("dice")) {
      this.diceDiv = createDiv('').id("dice");
      const button = createButton('Roll dice');
      const dice = this;
      button.mousePressed(function () {
        dice.roll();
      });
    }
  }
}