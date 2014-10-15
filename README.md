# About

This packages provides an interface to get microphone access via getUserMedia
or Flash and use it with the Web Audio API. It provides an interface to define
a handler function (onNoSource), when no getUserMedia an no Flash is detected in the browser.
Furthermore one can define a handler function (onNoSignal), which is executed if the signal is zero (e.g. 
if mic input level is turned down in system settings).

## Example

```javascript

//create a web audio context in your application
var audioContext = new AudioContext();

//to access the microphone, pass the audio context and your callbacks functions
 var microphone = new Microphone({
    audioContext: audioContext,
    onSuccess: function() {
        //connect the mic to your audio graph via webAudioNode of mic object
        mic.webAudioNode.connect(myWebAudioNode);
        myWebAudioNode.connect(audioContext.destination); //myWebAudioNode: an audio node created before

        // instead you can also connect directly to its sourceNode, if you don't need onAudioProcess and micCheck
        // mic.sourceNode.connect(myWebAudioNode);

        console.log("Mic access successfull!");
    },
    onReject: function() {
        console.warn("Mic access rejected");
    },
    onNoSignal: function(){
        console.error("No signal received so far, check your systems settings!");
    },
    onNoSource: function(){
        console.error("No getUserMedia and no Flash available in this browser!");
    },
    onAudioData: function(audioData){
        doSomeFancyStuffWith(audioData);
    }
});

```
## Attention

This package is not completely bug free yet.
Especially the Flash fallback can very laggy due to its dependency (flowkey:flashmic package).
Try it and feel free to contribute.