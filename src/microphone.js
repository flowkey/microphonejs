const MIC_CHECK_DURATION = 10000;

const MicCheckState = {
    inactive: 0,
    active: 1,
    check: 2
};

Microphone = class Microphone {
    constructor(options) {
        this.audioCtx = options.audioContext;
        this.bufferSize = options.bufferSize || 512;
        this.audioResource = null;
        this.intermediateNode = null;

        this.userOnSuccess = options.onSuccess;
        this.userOnReject = options.onReject;
        this.onNoSource = options.onNoSource;
        this.onNoSignal = options.onNoSignal;
        this.onAudioData = options.onAudioData;

        this.micCheckState = MicCheckState.inactive;
        this.audioFrameSum = 0;

        this.loaded = false;
        this.start();
    }

    load() {
        // create intermediate node with custom onaudioprocess function
        this.intermediateNode = this.audioCtx.createScriptProcessor(this.bufferSize, 1, 1);
        this.intermediateNode.onaudioprocess = this.onAudioProcess.bind(this);

        this.micCheckState = MicCheckState.active;
        let self = this;
        setTimeout( () => {
            self.micCheckState = MicCheckState.check;
        }, MIC_CHECK_DURATION);

        this.loaded = true;
    }

    onAudioProcess(e) {
        var nodeInput = e.inputBuffer.getChannelData(0);
        var nodeOutput = e.outputBuffer.getChannelData(0);

        //execute processAudioData function (just for the first (left) channel right now)
        if (this.onAudioData) {
            this.onAudioData(nodeInput);
        }

        //set node output
        nodeOutput.set(nodeInput);

        if (this.micCheckState == MicCheckState.inactive) {
            return;
        }
        this.micCheck(nodeInput);
    }

    connect(webaudioNode) {
        try {
            this.intermediateNode.connect(webaudioNode);
        } catch (e) {
            console.error(e);
        }
    }

    start() {
        if (!this.loaded) {
            this.load();
        }

        /*
         * check for getUserMedia
         * call noSourceHandler if not exists
         */
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            //create HTML5 getUserMedia Microphone Input
            let onSuccess = () => {
                if (this.audioResource) {
                    this.audioResource.sourceNode.connect(this.intermediateNode);
                    this.userOnSuccess();
                } else {
                    console.error('audioResource should exist but does not');
                }
            }
            let onReject = () => {
                this.userOnReject();
            }
            this.audioResource = new HTML5Audio(onSuccess, onReject, this.audioCtx);
        } else {
            console.warn('No microphone source was detected, please switch to another browser.');
            try {
                this.onNoSource();
            } catch (e) {
                console.error('An error occured during execution of onNoSource(): ', e);
            }
        }
    }

    micCheck(audioFrame) {
        if (this.micCheckState == MicCheckState.active) {
            for (var i = audioFrame.length - 1; i >= 0; i--) {
                const abs = Math.abs(audioFrame[i]);
                if (isNaN(abs)) return;
                this.audioFrameSum += abs;
            };
        } else if (this.micCheckState == MicCheckState.check) {
            if (this.audioFrameSum == 0) {
                console.warn('No signal from microphone detected, check your operating systems audio settings.');
                try {
                    this.onNoSignal();
                } catch (e) {
                    console.error('Error during execution of onNoSignal(): ', e);
                }
            }
            this.micCheckState = MicCheckState.inactive;
        }
    }

    stop() {
        if (this.audioResource) {
            // stops microphone input entirely
            this.audioResource.disable();
        }
    }
}