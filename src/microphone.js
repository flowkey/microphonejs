// this package should handle Microphone access to Users Mic.

Microphone = function(options) {

    this.processAudioData = options.processAudioData;

    this.noSourceEvent = flow.events.create("noSource");

    this.micCheckDuration = 25;
    this.micCheckCounter = 0;

    this.sourceNode;
    this.audioResource;
    this.webAudioNode;

    this.load(options);

};


// Control Interface
_.extend(Microphone.prototype, {
    load: function(options) {
        var self = this;
        var audioCtx = options.audioContext;
        var onSuccess = options.onSuccess;
        var onReject = options.onReject;

        /*
         * create webAudioNode which executes processAudioData
         */
        self.webAudioNode = audioCtx.createScriptProcessor(1024, 1, 1);
        self.webAudioNode.onaudioprocess = function(e) {

            var nodeInput = e.inputBuffer.getChannelData(0);
            var nodeOutput = e.outputBuffer.getChannelData(0);

            //check if there is any signal during the first blocks
            if (self.micCheckCounter < self.micCheckDuration) {
                self.micCheck(nodeInput);
            }

            //execute processAudioData function (just for the first (left) channel right now)
            if (self.processAudioData) {
                self.processAudioData(nodeInput);
            }

            //set node output
            nodeOutput.set(nodeInput);
        }

        /*
         * check for getUserMedia or flash
         */
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            //create HTML5 getUserMedia Microphone Input
            this.audioResource = new HTML5Audio(onSuccess, onReject, audioCtx, self);

        } else {
            if (this.thisBrowserHasFlash()) {

                //create Flash Microphone Input
                this.audioResource = new FlashAudio(onSuccess, onReject, audioCtx, self);

            } else {
                var noSource = new CustomEvent("noSource", {
                    message: "No getUserMedia and no Flash detected, please switch to a REAL browser or install Flash."
                });
                document.dispatchEvent(noSource);
            }
        }
    },

    micCheck: function(audioFrame) {
        this.micCheckCounter++;
        if (this.micCheckCounter == this.micCheckDuration) {
            var audioFrameSum = 0;
            for (var i = audioFrame.length - 1; i >= 0; i--) {
                audioFrameSum += audioFrame[i];
            };
            if (audioFrameSum == 0) {
                var noSignal = new CustomEvent("noSignal", {
                    message: "No signal from microphone detected, check your operating systems audio settings."
                });
                document.dispatchEvent(noSignal);
            }
        }
    },

    thisBrowserHasFlash: function() {
        if ((typeof swfobject !== 'undefined') && (swfobject.hasFlashPlayerVersion('10.0.0'))) {
            // console.log("swfobject is available, your major version is " + swfobject.getFlashPlayerVersion().major);
            return true;
        } else {
            return false;
        }
    },

    status: function() {
        // wraps audioresource status
        // actual microphone status - should be reactive 
        // unloaded - loading - ready - error - noSound
        return this.audioResource.getStatus();

    },

    stop: function() {
        // stops microphone input entirely
        this.audioResource.disable();
    },

    pause: function() {
        // pauses microphone input for a moment
        // maybe not possible
    }
})