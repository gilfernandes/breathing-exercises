class Quality {

  constructor(title, description, boostPercent) {
    this.title = title;
    this.description = description;
    this.boostPercent = boostPercent;
    this._boost = 0;
    this.start = 0;
    this.end = 0;
  }

  place(position, resolution) {
    if(position === 0) {
      return false;
    }
    const target = position + this._boost;
    if(target >= resolution * resolution)  {
      return false;
    }
    if(target < 0) {
      return false;
    }
    this.start = position;
    this.end = target;
    return true;
  }

  get boost() {
    return this._boost;
  }

  calculateBoost(resolution) {
    this._boost = (resolution * resolution) * this.boostPercent / 100;
  }
}