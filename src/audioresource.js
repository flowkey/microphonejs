// this is the interface / base class for every audio Resource every audioResource should implement / override
AudioResource = class AudioResource {

    constructor(onSuccess, onReject, audioCtx) {
        this.sourceNode = null;
        this.audioCtx = audioCtx;
        this.enable(onSuccess, onReject);
    }

    // inits the audioresource if needed
    enable(onSuccess, onReject) {
        console.log("not implemented")
    }

    // disable microphone entirely
    disable() {
        console.log("not implemented")
    }

    // mutes the Audio Input
    mute() {
        console.log("not implemented")
    }    

    // unmutes the Audio Input
    unmute() {
        console.log("not implemented")
    }
}