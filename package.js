Package.describe({
  summary: "Getting Microphone input from user",
  version: "0.0.2",
  git: "https://github.com/flowkey/microphonejs.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.2');
  api.use(['underscore', 'deps', 'ui', 'flowkey:flashmic@0.1.0'], 'client');
  api.addFiles(['src/audioresource.js', 'src/html5audio.js', 'src/flashaudio.js', 'src/microphone.js', ], 'client');
  api.export('Microphone');
});
