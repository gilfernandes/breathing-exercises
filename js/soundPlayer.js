var musicPlayerActive = false;

function Player(files) {
    if(musicPlayerActive) {
        this.files = files;
        this.musicSongs = files.map(function (f) {
            console.log("f: " + f);
            return loadSound(f);
        });
        this.playIndex = -1;
    }
}

Player.prototype.play = function(index) {
    if(musicPlayerActive) {
        if (this.musicSongs.length < index) {
            return;
        }
        if (!this.musicSongs[index].isPlaying()) {
            this.musicSongs[index].play();
            this.playIndex = index;
        }
    }
};

Player.prototype.playRandom = function() {
    if(musicPlayerActive) {
        const randomInt = Math.floor((Math.random() * this.musicSongs.length));
        this.play(randomInt);
    }
};

Player.prototype.stop = function() {
    if(musicPlayerActive) {
        if (this.playIndex > -1) {
            if (this.musicSongs[this.playIndex].isPlaying()) {
                this.musicSongs[this.playIndex].stop();
            }
        }
    }
};

Player.prototype.restartRandom = function() {
    this.stop();
    this.playRandom();
};