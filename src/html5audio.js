HTML5Audio = function() {
    //special variables
    this.audioContext;
    this.localStream;
}

HTML5Audio.prototype = new AudioResource;



_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    load: function() {
        var self = this;

        navigator.getUserMedia({audio: true}, function(stream) {    
            //create Source with the stream from getUserMedia
            // self.audioContext = new AudioContext();
            self.localStream = stream;
        }, function(){
            console.log("Gotta handle recjection, dude.");
        }); // end of getUsermedia
    },

    // returns Audio Buffer
    getBuffer: function() {
        
    },

    // returns Status of Audioresource
    // unloaded - loading - ready - error - noSound 
    getStatus: function() {

    },

    // mutes the Audio Input
    mute: function() {

    },

    // disable microphone entirely??? 
    disable: function() {

    }
})