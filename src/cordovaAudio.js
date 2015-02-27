if (!Meteor.isCordova) return;

CordovaAudio = function(onSuccess, onReject, audioCtx, microphone) {
    //special variables
    self = this;
    this.microphone = microphone;
    this.bufferLength = 2048;

    this.execCallbacks = true;
    this.status = "no status";
    this.audioBuffer = audioCtx.createBuffer(1, this.bufferLength, audioCtx.sampleRate);


    //callback function to be executed when Microphone is accepted
    this.createSourceNode = function() {

        // create buffer source node with audioContext
        microphone.sourceNode = audioCtx.createBufferSource();

        //init Buffer (gets filled on the MicrophoneF.ondata event)
        microphone.sourceNode.buffer = self.audioBuffer;

        //little trick, that needs to be done: set self.sourceNode on loop, so it is played permanently (with different buffer content of course)
        microphone.sourceNode.loop = true;

        //start "playing" the bufferSource
        microphone.sourceNode.start(0);

        // connect sourceNode to webAudioNode
        microphone.sourceNode.connect(microphone.webAudioNode);
    }

    this.load(onSuccess, onReject);
}

CordovaAudio.prototype = new AudioResource;


_.extend(CordovaAudio.prototype, {
    constructor: CordovaAudio,

    load: function(onSuccess, onReject) {
        var self = this;

        console.log("[cordovaAudio] Loading Mic");
        var micBuffer = self.audioBuffer.getChannelData(0);

        // Ask for mic permission and call onSuccess if we got it
        initStream(function (response) {
            console.log("[cordovaAudio] Got initial response:", response);
            if (response === "OK") {
                console.log("Starting Mic!");
                self.createSourceNode();
                onSuccess();

                startStreaming(function (nativeMicDataBuffer) {
                    micBuffer.set(new Float32Array(nativeMicDataBuffer));
                });
            } else {
                console.log("[cordovaAudio] Fail! Response was", response);
            }
        });
    },

    stop: function () {
        stopStreaming(function (response) {
            if (response === "OK") {
                console.log("[cordovaAudio] Stopped mic successfully");
            } else {
                console.warn("[cordovaAudio] Couldn't stop mic!");
            }
        });
    }
});

function initStream (callback) {
    console.log("[cordovaAudio] initStream");
    cordova.exec(callback, function(err) {
        callback('Error.');
    }, "MicAccess", "getBuffer", []);
}

function startStreaming (callback) {
    console.log("[cordovaAudio] startStreaming");
    cordova.exec(callback, function(err) {
        callback('Error.');
    }, "MicAccess", "startStreaming", []);
}

function stopStreaming (callback) {
    console.log("[cordovaAudio] stopStreaming");
    cordova.exec(callback, function(err) {
        callback('Error.');
    }, "MicAccess", "stopStreaming", []);
}
