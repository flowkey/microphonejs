# About

This packages provides an interface to get microphone access via HTML5 getUserMedia and use it with the Web Audio API. It provides several handler functions (onSuccess, onReject, onNoSource, onNoSignal): If there is no getUserMedia detected in the browser, the onNoSource-handler gets called. onSuccess/onReject is executed once the user accepts/rejects the microphone request. A mic check is performed after allowing access to the microphone. If there is no signal detected (e.g. if the microphones input level is set to zero in users system settings), the onNoSignal handler is executed.

## Attention

v1.0.0: removed support for fallback to flash, dependencies removed!

## Example

```javascript

//create a web audio context in your application
var audioContext = new AudioContext();
var myWebAudioNode = audioContext.createGain();

//to access the microphone, pass the audio context and your callbacks functions
var microphone = new Microphone({
    audioContext: audioContext,
    onSuccess: function() {
        //connect the microphone to the rest of your web audio chain (microphone includes intermediate ScriptProcessorNode for onNoSignal and onAudioData handler)
        microphone.connect(myWebAudioNode);
        myWebAudioNode.connect(audioContext.destination);

        // instead you can also connect directly to its sourceNode, if you don't need onAudioData and onNoSignal handler methods
        // microphone.sourceNode.connect(myWebAudioNode);

        console.log("Mic access successfull!");
    },
    onReject: function() {
        console.error("Mic access rejected");
    },
    onNoSignal: function() {
        console.error("No signal received so far, check your systems settings!");
    },
    onNoSource: function() {
        console.error("No getUserMedia and no Flash available in this browser!");
    },
    onAudioData: function(audioData){
        doSomeFancyStuffWith(audioData);
    }
});

```