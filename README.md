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
    onReject: onreject
});

//define your onready callback
var onready = function (){
    //connect the mic to your audio graph
    mic.webAudioNode.connect(myWebAudioNode);
    myWebAudioNode.connect(audioContext.destination);
    console.log("mic access permitted");
}

//define your onreject callback
var onreject = function (){
    console.log("mic access rejected");
}

```
## Attention

This package is not completely finished yet, try it and feel free to contribute.

