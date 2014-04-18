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

        if (navigator.getUserMedia){
            var self = this;
            navigator.getUserMedia({audio: true}, function(stream) {    
                //create Source with the stream from getUserMedia
                self.localStream = stream;
            }, function(){console.log("Gotta handle recjection, dude.");}
            ); // end of getUsermedia
        }else{
            console.log("Gotta provide flash fallback, dude!");
        }

    },
    start: function() {
        // starts micphone routine
    },

    status: function() {
        // wraps audioresource status
        // actual microphone status - should be reactive 
        // unloaded - loading - ready - error - noSound 
    },

    stop: function() {
        // stops microphone input entirely

        if (navigator.getUserMedia){
            this.localStream.stop();
            console.log("Stream stopped, dude.");
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