FlashAudio = function() {
    //special variables
    

}

FlashAudio.prototype = new AudioResource;



_.extend(FlashAudio.prototype, {
    constructor: FlashAudio,

    load: function() {
        var self = this;

        MicrophoneF.initialize();
        MicrophoneF.onready(function() {
            MicrophoneF.enable();
            MicrophoneF.ondata(function(data) {
                console.log(data.length); // Typically 2048 bytes.
            });
        });

    },

/*    function setupFlashSource(initFollower){
        // init flash lib / wrapper
        MicrophoneF.initialize();
        //init audioSource as BufferSource
        audioSource = audioContext.createBufferSource();
        //init Buffer (gets filled on the MicrophoneF.ondata event)
        audioSource.buffer = audioContext.createBuffer(1,blocklength,audioContext.sampleRate);
        //little trick, that needs to be done: set audioSource on loop, so it is played permanently (with different buffer content of course)
        audioSource.loop = true;
        //init follower and setup all the other audio nodes
        initFollower();
        setupAudioNodes();
    }*/

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