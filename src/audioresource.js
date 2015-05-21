// this is the Interface for every audio Resource every Resource should implement this!

AudioResource = function() {
    
    this.createSourceNode = function(stream) {
         console.log("not implemented")
    }

    // inits the audioresource if needed
    this.load = function() {
        console.log("not implemented")
    }

    // starts streaming
    this.start = function(){
        console.log("not implemented");
    }

    // stop streaming
    this.stop = function(){
        console.log("not implemented");
    }
    
    // disable microphone entirely
    this.disable = function() {
        console.log("not implemented")
    }

    // mutes the Audio Input
    this.mute = function() {
        console.log("not implemented")
    }    

    // unmutes the Audio Input
    this.unmute = function() {
        console.log("not implemented")
    }
}