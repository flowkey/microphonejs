Package.describe({
    name: 'flowkey:microphone',
    summary: "Getting Microphone input from user",
    version: "0.9.2",
  	git: "https://github.com/flowkey/microphonejs.git"
});

Package.on_use(function(api, where) {
	api.versionsFrom(['METEOR@1.0.3.1']);
    api.use(['underscore', 'deps', 'ui', 'flowkey:flashmic', 'flowkey:swfobject@1.0.0'], 'client');
    api.add_files([
        'src/audioresource.js',
        'src/html5audio.js',
        'src/flashaudio.js',
        'src/microphone.js',
        'src/cordovaaudio.js',
    ], 'client');

    if (api.export)
        api.export('Microphone');
});

Package.on_test(function(api) {
    api.use(['tinytest', 'test-helpers']);
    api.add_files([], 'client');
})