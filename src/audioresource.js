// this is the Interface for every audio Resource every Resource should implement this!

AudioResource = function() {

    // inits the audioresource if needed
    this.load = function() {
        console.log("not Implemented")
    }

    // returns Audio Buffer
    this.getBuffer = function() {
        console.log("not Implemented")
    }
    // returns Status of Audioresource
    // unloaded - loading - ready - error - noSound 
    this.getStatus = function() {
        console.log("not Implemented")
    }

    // mutes the Audio Input
    this.mute = function() {
        console.log("not Implemented")
    }

    // disable microphone entirely??? 
    this.disable = function() {
        console.log("not Implemented")
    }
}