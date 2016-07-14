Package.describe({
    summary: 'Getting Microphone input from user and route it through web audio api chain',
    version: '1.0.5',
    git: 'https://github.com/flowkey/microphonejs.git',
    name: 'flowkey:microphone'
});

Package.onUse(function(api, where) {
    api.versionsFrom(['1.2']);
    api.use(['deps', 'ui', 'ecmascript'], 'client');
    api.addFiles(['src/microphone.js', 'src/html5audio.js'], 'client');

    api.export('Microphone');
});
