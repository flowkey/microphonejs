HTML5Audio = function(onSuccess, onReject, audioCtx, microphone) {
    var self = this;
    this.microphone = microphone;
    this.audioCtx = audioCtx;
    // this.status = "no status";
    this.mediaStream;

    this.load(onSuccess, onReject);

}

HTML5Audio.prototype = new AudioResource;


_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    //callback function to be executed when Microphone is accepted
    createSourceNode: function(stream) {
        console.log("[HTML5 Audio] create source node");

        this.mediaStream = stream;
        // create media stream source node with audioContext
        this.microphone.sourceNode = this.audioCtx.createMediaStreamSource(this.mediaStream);
        // connect to webAudioNode
        this.microphone.sourceNode.connect(this.microphone.webAudioNode);
    },

    load: function(onSuccess, onReject) {
        console.log("[HTML5 Audio] loading...")
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

            // console.log(self);
            self.createSourceNode(stream);
            try {
                onSuccess(stream);
            } catch (e) {
                console.log(e);
            }

        }, onReject); // end of getUsermedia
    },

    // // returns Audio Buffer
    // getBuffer: function() {
    //     return this.mediaStream;
    // },

    // // returns Status of Audioresource
    // // unloaded - loading - ready - error - noSound 
    // getStatus: function() {
    //     return this.status;
    // },

    // mutes the Audio Input
    mute: function() {
        this.mediaStream.getAudioTracks()[0].enabled = false;
    },

    // unmutes the Audio Input
    unmute: function() {
        this.mediaStream.getAudioTracks()[0].enabled = true;
    },

    // disable microphone entirely
    disable: function() {
        if( this.mediaStream ) this.mediaStream.stop();
    }
})