// this package should handle Microphone access to Users Mic.

Microphone = function(audioCtx, onSuccess, onReject) {

    this.webAudioNode;
    this.volumeFunction;
    this.getUserMediaAnimation = true; // should decide if there is an animation under the getUserMedia "Accept" button
    this.audioResource;

    this.load(audioCtx, onSuccess, onReject);
};


// Control Interface
_.extend(Microphone.prototype, {
    load: function(audioCtx, onSuccess, onReject) {


        try{
            navigator.getUserMedia =    navigator.getUserMedia  || 
                                        navigator.webkitGetUserMedia||
                                        navigator.mozGetUserMedia   ||
                                        navigator.msGetUserMedia;
        }catch(e){
            alert('getUserMedia is not supported in this browser, dude.');
        }
    

        // if (false) {
        if (navigator.getUserMedia) {

            var self = this;

            //callback function to be executed when Microphone is accepted
            var createWebAudioNode = function() {
                // create media stream source node with audioContext
                self.webAudioNode = audioCtx.createMediaStreamSource(self.audioResource.audioBuffer);
            }

            // create getUserMedia audioResource
            this.audioResource = new HTML5Audio(createWebAudioNode, onSuccess, onReject);      
                
        } else {

            var self = this;

            //callback function to be executed when Microphone is accepted
            var createWebAudioNode = function() {
                // create buffer source node with audioContext
                self.webAudioNode = audioCtx.createBufferSource();
                //init Buffer (gets filled on the MicrophoneF.ondata event)
                self.webAudioNode.buffer = self.audioResource.audioBuffer;
                //little trick, that needs to be done: set self.webAudioNode on loop, so it is played permanently (with different buffer content of course)
                self.webAudioNode.loop = true;
                //start "playing" the bufferSource
                self.webAudioNode.start(0);
            }
            // create flash audio resource
            this.audioResource = new FlashAudio(createWebAudioNode, onSuccess, onReject, audioCtx);
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