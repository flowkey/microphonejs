HTML5Audio = function(onSuccess, onReject, audioCtx) {
    var self = this;
    this.audioBuffer;
    this.status = "no status";
    this.load(createWebAudioNode, onSuccess, onReject);
    this.webAudioNode;

    //callback function to be executed when Microphone is accepted
    this.createWebAudioNode = function() {
        // create media stream source node with audioContext
        self.webAudioNode = audioCtx.createMediaStreamSource(self.audioBuffer);
    }

    try {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
    } catch (e) {
        alert('getUserMedia is not supported in this browser, dude.');
    }
}

HTML5Audio.prototype = new AudioResource;



_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    load: function(createWebAudioNode, onSuccess, onReject) {

        var self = this;

        navigator.getUserMedia({
            audio: true
        }, function(stream) {
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