Package.describe({
    summary: "Getting Microphone input from user",
    version: "0.9.2",
  	git: "https://github.com/flowkey/microphonejs.git"
});

Package.on_use(function(api, where) {
	api.versionsFrom(['METEOR@0.9.0']);
    api.use(['underscore', 'deps', 'ui', 'flowkey:flashmic@0.1.2', 'flowkey:swfobject@1.0.0'], 'client');
    api.add_files(['src/microphone.js', 'src/AudioResource.js', 'src/audioresources/html5audio.js', 'src/audioresources/flashaudio.js',], 'client');

    if (api.export)
        api.export('Microphone');
});

Package.on_test(function(api) {
    api.use(['tinytest', 'test-helpers']);
    api.add_files([], 'client');
})