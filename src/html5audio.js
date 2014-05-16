HTML5Audio = function(crtWbAdNd, usrCllbck) {
    
    this.audioBuffer;

    this.load(crtWbAdNd, usrCllbck);
}

HTML5Audio.prototype = new AudioResource;



_.extend(HTML5Audio.prototype, {
    constructor: HTML5Audio,

    load: function(crtWbAdNd, usrCllbck) {
        var self = this;

        navigator.getUserMedia({audio: true}, function(stream) {    
            //create Source with the stream from getUserMedia
            self.audioBuffer = stream;
            console.log(self);
            crtWbAdNd();
            usrCllbck();
        }, function(){
            console.log("Gotta handle recjection, dude.");
        }); // end of getUsermedia
    },

    // returns Audio Buffer
    getBuffer: function() {
        return audioBuffer;
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
        this.audioBuffer.stop();
    }
})      