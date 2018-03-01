HTML5Audio = class HTML5Audio {
    constructor(onSuccess, onReject, audioCtx) {
        this.audioCtx = audioCtx;
        this.sourceNode = null;
        this.mediaStream = null;
        this.enable(onSuccess, onReject);
    }

    enable(onSuccess, onReject) {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((mediaStream) => { this.createSourceNode({ mediaStream, onSuccess }); })
            .catch(onReject);
    }

    createSourceNode({ mediaStream, onSuccess } = {}) {
        this.mediaStream = mediaStream;
        try {
            this.sourceNode = this.audioCtx.createMediaStreamSource(mediaStream);
            onSuccess(mediaStream);
        } catch (e) {
            console.log('Following error occured during onSuccess callback: ', e);
        }
    }

    // disable microphone entirely
    disable() {
        if (this.mediaStream) {
            // implementation of MediaStream.stop differs from browser to browser
            if (this.mediaStream.stop) {
                this.mediaStream.stop();
            } else {
                this.mediaStream
                    .getAudioTracks()
                    .forEach((track) => { track.stop(); });
            }
        }
    }

    // mutes the Audio Input
    mute() {
        if (!this.mediaStream) return;
        this.mediaStream
            .getAudioTracks()
            .forEach((track) => { track.enabled = false; });
    }

    // unmutes the Audio Input
    unmute() {
        if (!this.mediaStream) return;
        this.mediaStream
            .getAudioTracks()
            .forEach((track) => { track.enabled = true; });
    }
};
