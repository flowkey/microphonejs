// this is the Interface for every audio Resource every Resource should implement this!

AudioResource = function() {

    // inits the audioresource if needed
    this.load = function() {
        console.log("not implemented")
    }

    this.start = function(){
        console.log("not implemented");
    }

    this.stop = function(){
        console.log("not implemented");
    }


    // returns Audio Buffer
    // this.getBuffer = function() {
    //     console.log("not implemented")
    // }
    // returns Status of Audioresource
    // unloaded - loading - ready - error - noSound 
    // this.getStatus = function() {
    //     console.log("not implemented")
    // }

    // mutes the Audio Input
    this.mute = function() {
        console.log("not implemented")
    }    

    // unmutes the Audio Input
    this.unmute = function() {
        console.log("not implemented")
    }

    // disable microphone entirely??? 
    this.disable = function() {
        console.log("not implemented")
    }
}