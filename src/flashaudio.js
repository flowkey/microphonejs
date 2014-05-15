FlashAudio = function() {
    //special variables
    this.bufferLength = 2048;
    this.audioBuffer = new Array(this.bufferLength);  //ToDo: hard coded length is bad

}

FlashAudio.prototype = new AudioResource;



_.extend(FlashAudio.prototype, {
    constructor: FlashAudio,

    load: function() {
        var self = this;

        // init flash lib / wrapper
        MicrophoneF.initialize();

        MicrophoneF.onready(function() {

            //enable microphone
            setTimeout(MicrophoneF.enable, 500);

            //define onData event
            self.unmute();            

        });


    },

    // returns Audio Buffer
    getBuffer: function() {
        return this.audioBuffer;
    },

    // returns Status of Audioresource
    // unloaded - loading - ready - error - noSound 
    getStatus: function() {

    },

    // mutes the Audio Input
    mute: function() {
        var self = this;
        //define ondata handler
        MicrophoneF.ondata(function(data) {
            // set all values in buffer to zero
            for (var i = self.bufferLength - 1; i >= 0; i--) {
                self.audioBuffer[i] = 0;
            };
            console.log(self.audioBuffer[Math.round(self.bufferLength/2)]);

        });
    },

    //unmutes the Audio Input
    unmute: function() {
        var self = this;
        //define ondata handler
        MicrophoneF.ondata(function(data) {
            // convert data
            for (var i = self.bufferLength - 1; i >= 0; i--) {
                var floaty = (data.charCodeAt(i) - (27647)) / (27647);
                if (isNaN(floaty)) floaty = 0;
                self.audioBuffer[i] = floaty;
            };
            console.log(self.audioBuffer[500]);

        });
    },

    // disable microphone entirely??? 
    disable: function() {
        MicrophoneF.disable();
    }
})      