// this package should handle Microphone access to Users Mic.

Microphone = function(options) {

    this.processAudioData = options.processAudioData || function(currentFrame) {
        var max = 0;

        //calculate mean and max of currentFrame
        for (var i = currentFrame.length - 1; i >= 0; i--) {
            max = currentFrame[i] > max ? currentFrame[i] : max;
        };

        //calculate decibel value
        var db = 20 * Math.log(Math.max(max, Math.pow(10, -72 / 20))) / Math.LN10;

        //draw into interface
        volume.style.height = (15 - 15 * (db / -72)) + 'px';
    }

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

        //create webAudioNode which executes processAudioData 
        self.webAudioNode = audioCtx.createScriptProcessor(1024, 1, 1);
        self.webAudioNode.onaudioprocess = function(e) {

            var nodeInput = e.inputBuffer.getChannelData(0);
            var nodeOutput = e.outputBuffer.getChannelData(0);

            //execute processAudioData function (just for the first (left) channel right now)
            self.processAudioData(nodeInput);

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
                console.warn("No getUserMedia and no Flash, switch to another Browser for getUserMedia or install Flash.");
            }
        }
    },

    thisBrowserHasFlash: function() {
        // if (typeof swfobject !== 'undefined') && swfobject.getFlashPlayerVersion().major !== 0){
        //     console.log("swfObject is available, your major version is " + swfobject.getFlashPlayerVersion().major);
        //     return true;
        // }else{
        //     return false;
        // }

        var hasFlash = navigator.mimeTypes && navigator.mimeTypes.length ? Array.prototype.slice.call(navigator.mimeTypes).some(function(a) {
            return "application/x-shockwave-flash" == a.type;
        }) : /MSIE/.test(navigator.userAgent) ? eval("try { new ActiveXObject('ShockwaveFlash.ShockwaveFlash') && !0 } catch(e) { !1 };") : !1;

        return hasFlash;
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