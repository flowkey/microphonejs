Microphone = class Microphone {
    constructor(options) {
        this.audioCtx = options.audioContext;
        this.userOnSuccess = options.onSuccess;
        this.userOnReject = options.onReject;
        this.onNoSource = options.onNoSource;
        this.onAudioData = options.onAudioData;

        this.onNoSignal = options.onNoSignal;
        this.bufferSize = options.bufferSize || 512;

        this.micCheckDuration = 20;
        this.micCheckCounter = 0;
        this.audioFrameSum = 0;

        this.audioResource = null;
        this.intermediateNode = null;

        this.loaded = false;
        this.start();   
    }

    load() {

        /*
         * create intermediate node which executes onAudioData handler
         * and does a micCheck, whichs calls noSignal handler if necessary
         */
        this.intermediateNode = this.audioCtx.createScriptProcessor(this.bufferSize, 1, 1);
        this.intermediateNode.onaudioprocess = (e) => {
            var nodeInput = e.inputBuffer.getChannelData(0);
            var nodeOutput = e.outputBuffer.getChannelData(0);

            //check if there is any signal during the first audio frames
            if (this.micCheckCounter < this.micCheckDuration) {
                this.micCheck(nodeInput);
            }

            //execute processAudioData function (just for the first (left) channel right now)
            if (this.onAudioData) {
                this.onAudioData(nodeInput);
            }

            //set node output
            nodeOutput.set(nodeInput);
        }

        this.loaded = true;
    }

    connect(webaudioNode){
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
        this.micCheckCounter++;
        for (var i = audioFrame.length - 1; i >= 0; i--) {
            this.audioFrameSum += audioFrame[i];
        };
        if (this.micCheckCounter == this.micCheckDuration) {
            if (this.audioFrameSum == 0) {
                console.warn('No signal from microphone detected, check your operating systems audio settings.');
                try {
                    this.onNoSignal();
                } catch (e) {
                    console.error('Error during execution of onNoSignal(): ', e);
                }
            }
        }
    }

    stop() {
        if (this.audioResource) {
            // stops microphone input entirely
            this.audioResource.disable();
        }
    }
}