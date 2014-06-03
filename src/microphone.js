// this package should handle Microphone access to Users Mic.

Microphone = function(options) {

    this.volumeFunction;
    this.getUserMediaAnimation = true; // should decide if there is an animation under the getUserMedia "Accept" button
    this.audioResource;

    this.load(options);
};


// Control Interface
_.extend(Microphone.prototype, {
    load: function(options) {
        var self = this;
        var audioCtx = options.audioContext;
        var onSuccess = options.onSuccess;
        var onReject = options.onReject;
        var flash = options.flash;

        if (!flash) {
            this.audioResource = new HTML5Audio(onSuccess, onReject, audioCtx, self);
        } else {
            this.audioResource = new FlashAudio(onSuccess, onReject, audioCtx, self);
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