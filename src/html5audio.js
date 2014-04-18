HTML5Audio = function() {
    //special variables
    this.audioContext;
}

HTML5Audio.prototype = new AudioResource;



_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    load: function() {

    }

    // returns Audio Buffer
    getBuffer: function() {

    }
    // returns Status of Audioresource
    // unloaded - loading - ready - error - noSound 
    getStatus: function() {

    }

    // mutes the Audio Input
    mute: function() {

    }

    // disable microphone entirely??? 
    disable: function() {

    }
})