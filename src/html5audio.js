HTML5Audio = function(createWebAudioNode, onSuccess, onReject) {

    this.audioBuffer;
    this.status = "no status";

    this.load(createWebAudioNode, onSuccess, onReject);
}

HTML5Audio.prototype = new AudioResource;



_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    load: function(createWebAudioNode, onSuccess, onReject) {

        var self = this;

        navigator.getUserMedia({audio: true}, function(stream) {    
            //create Source with the stream from getUserMedia
            self.audioBuffer = stream;
            console.log(self);
            createWebAudioNode();
            onSuccess();
        }, onReject); // end of getUsermedia
    },

    // returns Audio Buffer
    getBuffer: function() {
        return this.audioBuffer;
    },

    // returns Status of Audioresource
    // unloaded - loading - ready - error - noSound 
    getStatus: function() {
        return this.status;
    },

    // mutes the Audio Input
    mute: function() {
        this.audioBuffer.getAudioTracks()[0].enabled = false;
    },

    // unmutes the Audio Input
    unmute: function() {
        this.audioBuffer.getAudioTracks()[0].enabled = true;
    },

    // disable microphone entirely
    disable: function() {
        this.audioBuffer.stop();
    }
})      