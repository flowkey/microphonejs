Package.describe({
    summary: "Getting Microphone input from user and route it through web audio api chain",
    version: "1.0.0",
  	git: "https://github.com/flowkey/microphonejs.git"
});

Package.on_use(function(api, where) {
	api.versionsFrom(['1.0']);
    api.use(['underscore', 'deps', 'ui'], 'client');
    api.add_files(['src/microphone.js', 'src/AudioResource.js', 'src/audioresources/html5audio.js'], 'client');

    if (api.export)
        api.export('Microphone');
});