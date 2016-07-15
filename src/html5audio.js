HTML5Audio = class HTML5Audio {
    constructor(onSuccess, onReject, audioCtx) {
        this.audioCtx = audioCtx;
        this.sourceNode = null;
        this.mediaStream = null;
        this.enable(onSuccess, onReject);
    }

    enable(onSuccess, onReject) {
        navigator.getUserMedia({ audio: true }, (stream) => {
            this.mediaStream = stream;
            try {
                this.sourceNode = this.audioCtx.createMediaStreamSource(stream);
                onSuccess(stream);
            } catch (e) {
                console.log('Following error occured during onSuccess callback: ', e);
            }
        }, onReject);
    }

    // disable microphone entirely
    disable() {
        if (this.mediaStream) {
            if (this.mediaStream.stop) {
                this.mediaStream.stop();
            } else {
                let track = this.mediaStream.getAudioTracks()[0];
                track.stop();
            }
        }
    }

    // mutes the Audio Input
    mute() {
        this.mediaStream.getAudioTracks()[0].enabled = false;
    }

    // unmutes the Audio Input
    unmute() {
        this.mediaStream.getAudioTracks()[0].enabled = true;
    }
}
