LegacyHTML5Audio = class LegacyHTML5Audio extends HTML5Audio {
    // override: use legacy navigator.getUserMedia with callbacks
    // instead of promise-based navigator.mediaDevices.getUserMedia
    enable(onSuccess, onReject) {
        const getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        getUserMedia(
            { audio: true },
            (mediaStream) => { this.createSourceNode({ mediaStream, onSuccess }); },
             onReject,
        );
    }
};
