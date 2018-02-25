class Tile {

  constructor(x, y, wh, index, next) {
    this.x = x;
    this.y = y;
    this.wh = wh;
    this.index = index;
    this.next = next;
    const colVal = index % 2 === 0 ? 200 : 0;
    this.color = color(colVal);
    this._quality = null;
  }

  center() {
    const halfWH = this.wh / 2;
    const x = this.x + halfWH;
    const y = this.y + halfWH;
    return {"x": x, "y": y};
  }

  show() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.wh, this.wh);
  }

  displayQuality() {
    if(this._quality) {
      const qualityColor = this._quality.boost > 0 ? color(100, 255, 0) : color(255, 0, 0);
      fill(qualityColor);
      strokeWeight(0);
      textSize(15);
      text(this._quality.title, this.x + 5, this.y + 15);
      this.displaySnadder(qualityColor);
    }
  }

  displaySnadder() {
    let myCenter = this.center();
    let nextCenter = sl.tiles[this.index + this._quality.boost].center();
    strokeWeight(10);
    if (this._quality.boost < 0) {
      stroke(255, 0, 0, 200);
    } else {
      stroke(0, 255, 0, 200);
    }
    line(myCenter.x, myCenter.y, nextCenter.x, nextCenter.y);
  }

  set quality(quality) {
    this._quality = quality;
    this.displayQuality();
  }
}