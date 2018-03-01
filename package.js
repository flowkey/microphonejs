Package.describe({
    summary: 'Getting Microphone input from user and route it through web audio api chain',
    version: '1.0.9',
    git: 'https://github.com/flowkey/microphonejs.git',
    name: 'flowkey:microphone',
});

Package.onUse(function(api) {
    api.versionsFrom(['1.2']);
    api.use(['deps', 'ui', 'ecmascript'], 'client');
    api.addFiles(['src/microphone.js', 'src/html5audio.js', 'src/html5audiolegacy.js'], 'client');

    api.export('Microphone');
});
