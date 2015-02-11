if (!Meteor.isCordova) return;

var CordovaAudio = function (onSuccess, onReject, audioCtx, microphone) {
	console.log("Initialising CordovaAudio plugin...");
	this.onSuccess = onSuccess;
	this.onReject = onReject;

	var bufferLength = 2048; // note that the incoming buffer from cordova is 4x this long (because it's full of (32 = 4 x 8)-bit numbers)
	this.audioBuffer = audioCtx.createBuffer(1, bufferLength, audioCtx.sampleRate);
	
	//callback function to be executed when Microphone is accepted
	this.createSourceNode = function() {

	    // create buffer source node with audioContext
	    microphone.sourceNode = audioCtx.createScriptProcessor(bufferLength, 0, 1); // no inputs, 1 mono output

	    //init Buffer (gets filled on the MicrophoneF.ondata event)
	    microphone.sourceNode.buffer = self.audioBuffer;

	    //little trick, that needs to be done: set self.sourceNode on loop, so it is played permanently (with different buffer content of course)
	    microphone.sourceNode.loop = true;

	    //start "playing" the bufferSource
	    microphone.sourceNode.start(0);

	    // connect sourceNode to webAudioNode
	    microphone.sourceNode.connect(microphone.webAudioNode);
	}
};


CordovaAudio.prototype.load = function() {
	console.log("[cordovaAudio] Loading Mic (noop)");

	getBuffer(); // get a buffer

	var micBuffer = new Float32Array(2048);

	microphone.sourceNode.onaudioprocess = function(e) {
		var webAudioNodeOutput = e.outputBuffer.getChannelData(0);
		
		getBuffer(function (buffer) {
			if (!buffer.byteLength) {
				return console.log("Error!:", buffer);
			}
			micBuffer = new Float32Array(buffer);
			webAudioNodeOutput.set(micBuffer);
		});
	}
};


// -----------------------------------------------------------------------------
// 


function getBuffer (callback) {
	callback = callback || defaultGetBufferCallback;
	cordova.exec(callback, function(err) {
		callback('Error.');
	}, "CordovaAudio", "getBuffer", []);
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