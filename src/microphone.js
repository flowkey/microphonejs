// this package should handle Microphone access to Users Mic.

Microphone = function(audioCtx, userCallback) {

    this.webAudioNode;
    this.volumeFunction;
    this.getUserMediaAnimation = true; // should decide if there is an animation under the getUserMedia "Accept" button
    this.audioResource;

    this.load(audioCtx, userCallback);
};


// Control Interface
_.extend(Microphone.prototype, {
    load: function(audioCtx, userCallback) {


        try{
            navigator.getUserMedia =    navigator.getUserMedia  || 
                                        navigator.webkitGetUserMedia||
                                        navigator.mozGetUserMedia   ||
                                        navigator.msGetUserMedia;
        }catch(e){
            alert('getUserMedia is not supported in this browser, dude.');
        }

        
        if (navigator.getUserMedia){
        // if (false) {

            var self = this;
            var createWebAudioNode = function() {
                self.webAudioNode = audioCtx.createMediaStreamSource(self.audioResource.audioBuffer);
            }
            this.audioResource = new HTML5Audio(createWebAudioNode, userCallback);      
                
        }else{

            var self = this;
            var createWebAudioNode = function() {

                self.webAudioNode = audioCtx.createBufferSource();

                //init Buffer (gets filled on the MicrophoneF.ondata event)
                self.webAudioNode.buffer = self.audioResource.audioBuffer;

                //little trick, that needs to be done: set self.webAudioNode on loop, so it is played permanently (with different buffer content of course)
                self.webAudioNode.loop = true;

                //start "playing" the bufferSource
                self.webAudioNode.start(0);
            }
            this.audioResource = new FlashAudio(createWebAudioNode, userCallback, audioCtx);
        }

        setTimeout(function() {

        }, 3000);

        

    },

    status: function() {
        // wraps audioresource status
        // actual microphone status - should be reactive 
        // unloaded - loading - ready - error - noSound 
    },

    stop: function() {
        // stops microphone input entirely

        this.audioResource.disable();
    },

    pause: function() {
        // pauses microphone input for a moment
    }

})



// Microphone Interfaces
// HTML5 - FLASH - OTHER ???
// every interface should return all basics plus 
// _.extend(Microphone.prototype, {
//     getUserMedia: function() {
//         var self = this;
//         self.audioResource = new HTML5Audio();;
//     }
// })