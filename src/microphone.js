// this package should handle Microphone access to Users Mic.

Microphone = function(audioCtx) {

    this.volumeFunction;
    this.getUserMediaAnimation = true; // should decide if there is an animation under the getUserMedia "Accept" button
    this.audioResource;

    this.load(audioCtx);
};


// Control Interface
_.extend(Microphone.prototype, {
    load: function(audioCtx) {


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
            var myCallback = function() {
                var sourcenode = audioCtx.createMediaStreamSource(self.audioResource.localStream);
                console.log(sourcenode);
            }
            this.audioResource = new HTML5Audio(myCallback);      
                
        }else{
            this.audioResource = new FlashAudio;
            
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