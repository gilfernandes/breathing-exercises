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

  containsPoint(x, y) {
    return this.x <= x && this.x + this.wh > x && this.y < y && this.y + this.wh > y;
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
      textAlign(LEFT);
      textSize(15);
      text(this._quality.title, this.x + 5, this.y + 15);
      this.displaySnadder(qualityColor);
    }
  }

  displaySnadder() {
    let myCenter = this.center();
    const nextCenterIndex = this.index + this._quality.boost;
    let nextCenter = sl.tiles[nextCenterIndex].center();
    strokeWeight(10);
    this.chooseStroke();
    line(myCenter.x, myCenter.y, nextCenter.x, nextCenter.y);

    this.displayPointer(this.index, nextCenterIndex);
  }

  chooseStroke() {
    if (!this.isVirtue()) {
      stroke(255, 0, 0, 200);
    } else {
      stroke(0, 255, 0, 200);
    }
  }

  displayPointer(myIndex, otherIndex) {
    // Find the point connecting the adjacent and opposite
    let row = floor(Math.min(myIndex, otherIndex) / sl.resolution);
    let diff = parseInt((this.isVirtue() ? otherIndex : myIndex) / sl.resolution) % 2 === 0 ? 9 : 0;
    let col = this.isVirtue() ? otherIndex % sl.resolution : myIndex % sl.resolution;
    col = Math.abs(diff - col);
    let index = row * sl.resolution + (row % 2 === 0 ? 9 - col : col);
    const center = sl.tiles[index].center();

    let myIndexCenter = sl.tiles[myIndex].center();
    let otherIndexCenter = sl.tiles[otherIndex].center();
    const distIndexCenter = dist(center.x, center.y, myIndexCenter.x, myIndexCenter.y);
    const distOtherIndexCenter = dist(center.x, center.y, otherIndexCenter.x, otherIndexCenter.y);
    const angleCorrection = myIndexCenter.x > otherIndexCenter.x ? -1 : 1;
    const angleIncrement = this.isVirtue() ? 45 : 90 + 45;
    let angle = atan(angleCorrection > 0 ? distIndexCenter / distOtherIndexCenter : distOtherIndexCenter / distIndexCenter)
      + 2 * PI * (angleCorrection * angleIncrement / 360);

    push();
    strokeWeight(10);
    this.chooseStroke();
    translate(otherIndexCenter.x, otherIndexCenter.y);
    rotate(angle);
    line(0, 0, 0, 20);
    line(0, 0, 20, 0);
    pop();
  }

  isVirtue() {
    return this._quality.boost > 0;
  }

  set quality(quality) {
    this._quality = quality;
    this.next = this.index + this._quality.boost;
  }

  get quality() {
    return this._quality;
  }
}