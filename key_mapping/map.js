const raw = require("./ans.json");
const robo = ["backspace", "delete", "enter", "tab", "escape", "up", "down", "left", "right", "home", "end", "pageup", "pagedown", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "command", "alt", "control", "shift", "right_shift", "space", "printscreen", "insert", "audio_mute", "audio_vol_down", "audio_vol_up", "audio_play", "audio_stop", "audio_pause", "audio_prev", "audio_next", "audio_rewind", "audio_forward", "audio_repeat", "audio_random", "numpad_0", "numpad_1", "numpad_2", "numpad_3", "numpad_4", "numpad_5", "numpad_6", "numpad_7", "numpad_8", "numpad_9", "lights_mon_up", "lights_mon_down", "lights_kbd_toggle", "lights_kbd_up", "lights_kbd_down", 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let output = {};

console.log(raw.length, robo.length)

if (raw.length !== robo.length) {
    throw new Error("ERROR: `raw` length and `robo` length aren't equal");
}

raw.forEach((rawKey, rawIndex) => {
    rawKey = rawKey === "VK_RBUTTON" ? `404 NF_${Math.floor(Math.random()*(robo.length * 1e+5))}` : rawKey;
    output[rawKey] = robo[rawIndex];
});

require("fs").writeFileSync("map.json", JSON.stringify(output, null, 4));

console.log("CHECKSUM:");

if (Object.keys(output).length !== robo.length) {
    return console.log("FAIL! Required: " + robo.length + " Got: " + Object.keys(output).length);
}

console.log("SUCCESS! Got " + robo.length);
