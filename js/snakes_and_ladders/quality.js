class Quality {

  constructor(title, description, boostPercent) {
    this.title = title;
    this.description = description;
    this.boostPercent = boostPercent;
    this._boost = 0;
    this.start = 0;
    this.end = 0;
    this.isVirtue = false;
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
    this.isVirtue = this._boost > 0;
  }

  displayDetails() {
    let qualityDetails = document.getElementById("qualityDetails");
    if(!qualityDetails) {
      createDiv("").id("qualityDetails");
      qualityDetails = document.getElementById("qualityDetails");
    }
    const clazz = this.isVirtue ? "virtue" : "weakness";
    qualityDetails.innerHTML = `<h3 class="${clazz}">${this.title}</h3><div class="${clazz}">${this.description}</div>`;
    if(sl.hideQualityThread) {
      clearTimeout(sl.hideQualityThread);
    }
    document.getElementById("qualityDetails").className="visible";
    sl.hideQualityThread = sl.hideQuality();
  }
}