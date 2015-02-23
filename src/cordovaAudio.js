if (!Meteor.isCordova) return;

CordovaAudio = function (onSuccess, onReject, audioCtx, microphone) {
	console.log("Initialising CordovaAudio plugin...");

	var bufferLength = 2048; // note that the incoming buffer from cordova is 4x this long (because it's full of (32 = 4 x 8)-bit numbers)
	this.audioBuffer = audioCtx.createBuffer(1, bufferLength, audioCtx.sampleRate);
	this.microphone = microphone;

    // create buffer source node with audioContext
    microphone.sourceNode = audioCtx.createScriptProcessor(bufferLength, 1, 1); // 1 inputs, 1 mono output
	microphone.sourceNode.connect(microphone.webAudioNode);

	//callback function to be executed when Microphone is accepted
	this.createSourceNode = function() {

	    //init Buffer (gets filled on the MicrophoneF.ondata event)
	    // microphone.sourceNode.buffer = self.audioBuffer;

	    // //little trick, that needs to be done: set self.sourceNode on loop, so it is played permanently (with different buffer content of course)
	    // microphone.sourceNode.loop = true;

	    // //start "playing" the bufferSource
	    // microphone.sourceNode.start(0);

	    // connect sourceNode to webAudioNode
		
	}
	
	
	this.load(bufferLength, onSuccess, onReject);
};


CordovaAudio.prototype.load = function(bufferLength, onSuccess, onReject) {
	console.log("[cordovaAudio] Loading Mic");

	// Ask for mic permission and call onSuccess if we got it
	getBuffer(function (buffer) {
		console.log("[cordovaAudio] Got initial response");
		if (buffer && buffer.byteLength) {
			console.log("Success!");
			onSuccess();
		} else {
			console.log("Fail!");
		}
	});

	// var micBuffer = new Float32Array(bufferLength);

	this.microphone.sourceNode.onaudioprocess = function(e) {
		// console.log("[cordovaAudio] sourceNode onaudioprocess");

		var webAudioNodeOutput = e.outputBuffer.getChannelData(0);
		
		getBuffer(function (buffer) {
			// console.log("[cordovaAudio] getBuffer recall", buffer);
			if (!buffer.byteLength) {
				return console.log("Error!:", buffer);
			}
			// micBuffer = new Float32Array(buffer);
			webAudioNodeOutput.set(new Float32Array(buffer));
		});
	}
};


// -----------------------------------------------------------------------------
// 


function getBuffer (callback) {
	callback = callback || defaultGetBufferCallback;
	cordova.exec(callback, function(err) {
		callback('Error.');
	}, "MicAccess", "getBuffer", []);
};

function logBuffer () {
	getBuffer(function (buffer) {
		if (!buffer.byteLength) {
			return console.log("Error!:", buffer);
		}

		var float32 = new Float32Array(buffer);
		var bufferContents = "";

		for (var i = 0; i < buffer.byteLength / 4; i++) {
			bufferContents += float32[i];
			bufferContents += " ";
		}

		console.log("Buffer:" + bufferContents);
	});
};

function defaultGetBufferCallback (buffer) {
	console.log(buffer);
};