HTML5Audio = function(callback) {
    //special variables
    this.localStream;

    this.load(callback);
}

HTML5Audio.prototype = new AudioResource;



_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    load: function(callback) {
        var self = this;

        navigator.getUserMedia({audio: true}, function(stream) {    
            //create Source with the stream from getUserMedia
            self.localStream = stream;
            console.log(self);
            callback();
        }, function(){
            console.log("Gotta handle recjection, dude.");
        }); // end of getUsermedia
    },

    // returns Audio Buffer
    getBuffer: function() {
        return localStream;
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
        this.localStream.stop();
    }
})      