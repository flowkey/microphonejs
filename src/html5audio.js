HTML5Audio = function(onSuccess, onReject, audioCtx, microphone) {
    var self = this;
    this.audioBuffer;
    this.microphone = microphone;
    this.status = "no status";
    this.load(onSuccess, onReject);

    //callback function to be executed when Microphone is accepted
    this.createSourceNode = function() {
        // create media stream source node with audioContext
        microphone.sourceNode = audioCtx.createMediaStreamSource(self.audioBuffer);
        // connect to webAudioNode
        microphone.sourceNode.connect(microphone.webAudioNode);
    }

}

HTML5Audio.prototype = new AudioResource;


_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    load: function(onSuccess, onReject) {

        var self = this;

        try {
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
        } catch (e) {
            alert('getUserMedia is not supported in this browser.');
        }


        navigator.getUserMedia({
            audio: true
        }, function(stream) {
            //create Source with the stream from getUserMedia
            self.audioBuffer = stream;
            // console.log(self);
            self.createSourceNode();
            try {
                onSuccess();
            } catch (e) {
                console.log(e);
            }

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