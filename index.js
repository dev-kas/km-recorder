const { GlobalKeyboardListener } = require("node-global-key-listener");
const mappings = require("./map.json");
const fs = require("fs");
const robot = require("robotjs");

const listener = new GlobalKeyboardListener();
const timeStart = Date.now();
let prevMousePos = robot.getMousePos();
let history = [];

listener.addListener((e, down)=>{
    const roboKey = mappings[e.rawKey._nameRaw];
    // if (!roboKey) return console.log("invalid key: " + e.rawKey._nameRaw);
    console.log(`Raw name: ${e.rawKey._nameRaw} Robo name: ${mappings[e.rawKey._nameRaw]}`);
    // fs.appendFileSync("./output.km", `KEY ${roboKey} ${e.state.toLowerCase()}\n`);
    const isValid = !!roboKey;

    addAction({
        isValid,
        roboKey,
        down,
        event: e,
    })
});

setInterval(() => {
    const currentMousePos = robot.getMousePos();
    
    if (currentMousePos.x !== prevMousePos.x || currentMousePos.y !== prevMousePos.y) {
        addAction({
            isValid: true,
            roboKey: "MV_MOUSE",
            event: {
                rawKey: { _nameRaw: "MV_MOUSE" },
            }
        })
        prevMousePos = currentMousePos;
    }
}, 10);

function addAction(e) {
    if (e.isValid && !([ "VK_LBUTTON", "VK_RBUTTON", "MV_MOUSE" ].includes(e.event.rawKey._nameRaw))) {
        // fs.appendFileSync("./output.km", `KEY ${e.roboKey} ${e.event.state.toLowerCase()}\n`);
        history.push(`${Date.now()} KEY ${e.roboKey} ${e.event.state.toLowerCase()}`);
    }

    if (e.event.rawKey._nameRaw === "VK_LBUTTON") {
        const pos = robot.getMousePos();
        // fs.appendFileSync("./output.km", `CLICK left ${pos.x} ${pos.y}\n`);
        history.push(`${Date.now()} CLICK left ${pos.x} ${pos.y} ${e.event.state.toLowerCase()}`);
    } else if (e.event.rawKey._nameRaw === "VK_RBUTTON") {
        const pos = robot.getMousePos();
        // fs.appendFileSync("./output.km", `CLICK right ${pos.x} ${pos.y}\n`);
        history.push(`${Date.now()} CLICK right ${pos.x} ${pos.y} ${e.event.state.toLowerCase()}`);
    }

    if (e.event.rawKey._nameRaw === "MV_MOUSE") {
        const pos = robot.getMousePos();
        // fs.appendFileSync("./output.km", `MOVE ${pos.x} ${pos.y}\n`);
        history.push(`${Date.now()} MOVE ${pos.x} ${pos.y}`);
        console.log(pos);
    }
}

function beforeExit() {
    let parsedHistory = [];
    let prevTime = timeStart;
    history.forEach((h) => {
        let historyTokens = h.split(" ");
        actionTime = parseFloat(historyTokens.shift());
        let delta = actionTime - prevTime;
        prevTime = actionTime;
        parsedHistory.push(`WAIT ${delta}`);
        parsedHistory.push(historyTokens.join(" "));
    });

    fs.writeFileSync("output.km", parsedHistory.join(";")+"\n");

    process.exit(0);
}

process.on("beforeExit", beforeExit);
process.on("SIGINT", beforeExit);
process.on("exit", beforeExit);
