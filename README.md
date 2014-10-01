# About

This packages provides an interface to get microphone access via getUserMedia
or Flash and use it with the web audio api.

## Example

```javascript

//create a web audio context in your application
var audioContext = new AudioContext();

//to access the microphone, pass the audio context and your callbacks functions
var mic = new Microphone({
    audioContext: audioContext, 
    onSuccess: onready, 
    onReject: onreject,
    noSourceHandler: noSourceHandler,
    processAudioData: processAudioData
});

//in order to use it with the Web Audio API, you can connect your graph to

//define your onready callback
var onready = function (){

    //connect the mic via its webAudioNode to your web audio graph!
    mic.webAudioNode.connect(myWebAudioNode);

    myWebAudioNode.connect(audioContext.destination);
    console.log("mic access permitted");
}

//define your onreject callback
var onreject = function (){
    console.log("mic access rejected");
}

//define your noSourceHandler (if theres no getUserMedia and no Flash)
var noSourceHandler = function (){
    console.log("No getUserMedia and no Flash available");
}


// define your processAudioData function to process raw audio data coming from microphone
// (e.g. for visualization, audio analysis and whatsoever)
var noSourceHandler = function (currentAudioFrame){
    doSomethingFancyWith(currentAudioFrame);
}

```
## Attention

This package is not completely bug free yet, try it and feel free to contribute.

