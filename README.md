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
    processAudioData: processAudioData
});

//in order to use it with the Web Audio API, you can connect your graph to

//define your onready callback
var onready = function (){

    //connect the mic via its webAudioNode to your web audio graph!
    //webAudioNode provides processAudioData injection and noSignal check
    mic.webAudioNode.connect(myWebAudioNode);

    //if processAudioData and/or noSignal check is not needed you can connect to sourceNode directly as well
    mic.sourceNode.connect(myWebAudioNode);

    myWebAudioNode.connect(audioContext.destination);
    console.log("mic access permitted");
}

//define your onreject callback
var onreject = function (){
    console.log("mic access rejected");
}

//define your listener for the noSignal event (e.g. if microphone input level is zero in system settings)
document.addEventListener('noSignal', function (e) { console.log(e) }, false);

//define your listener for the noSource event (if theres no getUserMedia and no Flash)
document.addEventListener('noSource', function (e) { console.log(e) }, false);


// define your processAudioData function to process raw audio data coming from microphone
// (e.g. for visualization, audio analysis and whatsoever)
var processAudioData = function (currentAudioFrame){
    doSomethingFancyWith(currentAudioFrame);
}

```
## Attention

This package is not completely bug free yet, try it and feel free to contribute.

