const gamepad = require("gamepad");
const player = require('play-sound')(opts = {});
const fs = require('fs');

const sounds = JSON.parse(fs.readFileSync('./sounds.json', 'utf8'));

// Initialize the library
gamepad.init();

setInterval(gamepad.processEvents, 16);
setInterval(gamepad.detectDevices, 500);

let playing = [];

let audioPersistent;
let audio;
gamepad.on("up", function (id, num) {
    if (audio != null) {
        console.log("dixie horn stop");
        audio.kill();
        audio = null;
    }
});

gamepad.on("down", function (id, num) {
    console.log(`dixie horn start with ${num}`);
    let sound = sounds[num + 1];

    if (sound !== undefined) {
        if (sound.persistent) {
            if (!audioPersistent)
                audioPersistent = player.play(`./sounds/${sounds[num + 1].file}.mp3`, (err) => {
                    if (err) console.log(`Could not play sound: ${err}`);
                });
            else {
                audioPersistent.kill();
                audioPersistent = null;
            }
        }

        audio = player.play(`./sounds/${sounds[num + 1].file}.mp3`, (err) => {
            if (err) console.log(`Could not play sound: ${err}`);
        });
    }
});
