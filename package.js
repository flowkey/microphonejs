Package.describe({
    summary: 'Getting Microphone input from user and route it through web audio api chain',
    version: '1.0.2',
    git: 'https://github.com/flowkey/microphonejs.git',
    name: 'flowkey:microphone'
});

Package.onUse(function(api, where) {
    api.versionsFrom(['1.0']);
    api.use(['underscore', 'deps', 'ui'], 'client');
    api.addFiles(['src/microphone.js', 'src/AudioResource.js', 'src/audioresources/html5audio.js'], 'client');

    api.export('Microphone');
});
