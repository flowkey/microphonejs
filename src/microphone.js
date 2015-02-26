// this package should handle Microphone access to Users Mic.

Microphone = function(options) {

    this.audioCtx = options.audioContext;
    this.onSuccess = options.onSuccess;
    this.onReject = options.onReject;
    this.onNoSource = options.onNoSource;
    this.onAudioData = options.onAudioData;
    this.onFlashInit = options.onFlashInit;
    this.onNoSignal = options.onNoSignal;

    this.micCheckDuration = 10;
    this.micCheckCounter = 0;
    this.audioFrameSum = 0;

    this.sourceNode;
    this.audioResource;
    this.webAudioNode;

    this.flash = options.flash !== undefined ? options.flash : true;

    this.loaded = false;
    this.started = false;
    this.start();

};


// Control Interface
_.extend(Microphone.prototype, {
    load: function() {
        console.log("[Microphone] loading");
        var self = this;

        /*
         * create webAudioNode which executes onAudioData handler
         * and does a micCheck, whichs calls noSignal handler if necessary
         */
        self.webAudioNode = self.audioCtx.createScriptProcessor(1024, 1, 1);
        self.webAudioNode.onaudioprocess = function(e) {

            var nodeInput = e.inputBuffer.getChannelData(0);
            var nodeOutput = e.outputBuffer.getChannelData(0);

            //check if there is any signal during the first blocks
            if (self.micCheckCounter < self.micCheckDuration) {
                self.micCheck(nodeInput);
            }

            //execute processAudioData function (just for the first (left) channel right now)
            if (self.onAudioData) {
                self.onAudioData(nodeInput);
            }

            //set node output
            nodeOutput.set(nodeInput);
        }

        this.loaded = true;
    },


    start: function(){
        var self = this;

        console.log("[Microphone] starting");


        if (!this.loaded){
            this.load();
        }

        /*
         * check for getUserMedia or flash
         * call noSourceHandler if none of them exists
         */
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            //create HTML5 getUserMedia Microphone Input
            this.audioResource = new HTML5Audio(this.onSuccess, this.onReject, this.audioCtx, this);
        } else {
            if (this.flash && this.thisBrowserHasFlash()) {
                //create Flash Microphone Input
                this.audioResource = new FlashAudio(this.onSuccess, this.onReject, this.audioCtx, this);
                if(this.onFlashInit) this.onFlashInit();
            } else {
                try {
                    this.onNoSource();
                } catch (e) {
                    console.log(e);
                    console.warn("No getUserMedia and no Flash detected, please switch to a REAL browser or install Flash.");
                }
            }
        }
    },

    micCheck: function(audioFrame) {
        this.micCheckCounter++;
        for (var i = audioFrame.length - 1; i >= 0; i--) {
            this.audioFrameSum += audioFrame[i];
        };
        if (this.micCheckCounter == this.micCheckDuration) {
            if (this.audioFrameSum == 0) {
                try {
                    this.onNoSignal();
                } catch (e) {
                    console.log(e);
                    console.warn("No signal from microphone detected, check your operating systems audio settings.");

                }
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

    stop: function() {
        console.log("[Microphone] stopping");
        // stops microphone input entirely
        this.audioResource.disable();
    },

    // status: function() {
    //     // wraps audioresource status
    //     // actual microphone status - should be reactive 
    //     // unloaded - loading - ready - error - noSound
    //     return this.audioResource.getStatus();

    // },


    // pause: function() {
    //     // pauses microphone input for a moment
    //     // maybe not possible
    // }
})