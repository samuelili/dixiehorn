const gamepad = require("gamepad");
const player = require('play-sound')(opts = {});
const fs = require('fs');

const sounds = JSON.parse(fs.readFileSync('./sounds.json', 'utf8'));

// Initialize the library
gamepad.init();

setInterval(gamepad.processEvents, 16);
setInterval(gamepad.detectDevices, 500);

let audio;
gamepad.on("up", function (id, num) {
    if (audio != null) {
        console.log("dixie horn stop");
        audio.kill();
    }
});

gamepad.on("down", function (id, num) {
    console.log("dixie horn start");
    audio = player.play(`./sounds/${sounds[num + 1]}.mp3`, (err) => {
        if (err) console.log(`Could not play sound: ${err}`);
    });
});
