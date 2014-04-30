// this package should handle Microphone access to Users Mic.

Microphone = function(obj) {
    this.volumeFunction;
    this.getUserMediaAnimation = true; // should decide if there is an animation under the getUserMedia "Accept" button
    this.audioResource;
};


// Control Interface
_.extend(Microphone.prototype, {
    load: function(options) {
        // startes microphone access - 
        // e.g. startes getUserMedia dialog
        // options for flash fallback or other input

        try{
            navigator.getUserMedia =    navigator.getUserMedia  || 
                                        navigator.webkitGetUserMedia||
                                        navigator.mozGetUserMedia   ||
                                        navigator.msGetUserMedia;
        }catch(e){
            alert('getUserMedia is not supported in this browser, dude.');
        }

        
        // if (navigator.getUserMedia){
        if (false){
            //HTML5 getUserMedia
            this.audioResource = new HTML5Audio;
        }else{

            this.audioResource = new FlashAudio;
        }

        //load audio resource
        this.audioResource.load();

    },
    start: function() {
        // starts micphone routine
        this.audioResource.start();
    },

    status: function() {
        // wraps audioresource status
        // actual microphone status - should be reactive 
        // unloaded - loading - ready - error - noSound 
    },

    stop: function() {
        // stops microphone input entirely

        if (navigator.getUserMedia){
            this.audioResource.localStream.stop();
        }else{
            //stop flash mic
        }
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