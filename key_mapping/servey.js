const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener;
const readline = require('readline');

// List of questions
const questions = ["backspace", "delete", "enter", "tab", "escape", "up", "down", "left", "right", "home", "end", "pageup", "pagedown", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "command", "alt", "control", "shift", "right_shift", "space", "printscreen", "insert", "audio_mute", "audio_vol_down", "audio_vol_up", "audio_play", "audio_stop", "audio_pause", "audio_prev", "audio_next", "audio_rewind", "audio_forward", "audio_repeat", "audio_random", "numpad_0", "numpad_1", "numpad_2", "numpad_3", "numpad_4", "numpad_5", "numpad_6", "numpad_7", "numpad_8", "numpad_9", "lights_mon_up", "lights_mon_down", "lights_kbd_toggle", "lights_kbd_up", "lights_kbd_down", 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array to store answers
let answers = [];
let currentQuestionIndex = 0;

// Function to ask the current question
const askQuestion = () => {
    console.clear();
    if (currentQuestionIndex < questions.length) {
        console.log("PRESS: ", questions[currentQuestionIndex]);
    } else {
        console.log("All questions answered!");
        console.log("Answers: ", answers);
        require("fs").writeFileSync("./ans.json", JSON.stringify(answers));
        process.exit(0);
    }
};

// Initialize the global keyboard listener
const listener = new GlobalKeyboardListener();

listener.addListener((e, down) => {
    if (e.state === "DOWN" && e.rawKey._nameRaw !== "VK_LBUTTON") { // Only consider key down events
        const answer = e.rawKey._nameRaw;
        console.log(`${answer}`);
        answers.push(answer);
        currentQuestionIndex++;
        askQuestion();
    }
});

// Start by asking the first question
askQuestion();
