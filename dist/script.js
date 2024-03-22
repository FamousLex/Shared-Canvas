import p5 from 'p5';
let socket = new WebSocket("ws://localhost:3000"); //make me a socket
let c = 0; // color variable
let mySound;
let dragSound;
let pg;
let colorPicker;
var now = new Date();
var startTicks = now.getTime();
function detectMob() {
    if ((window.innerWidth <= 800) && (window.innerHeight <= 600)) {
        return true;
    }
    else {
        return false;
    }
}
;
const s = (p) => {
    p.preload = () => {
        // Load your sounds and other assets
        // mySound = p.loadSound('PS2.wav');
        // dragSound = p.loadSound('fx.wav');
    };
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 255);
        p.background(0);
        c = p.random(255); //random color
        p.noStroke();
        // Initialize your color picker and other elements here
        // Note: DOM elements might need to be handled differently in instance mode
    };
    p.draw = () => {
        let currentNow = new Date();
        let currentTicks = currentNow.getTime();
        if (currentTicks - startTicks >= 500) {
            p.noStroke();
            p.fill(0, 20);
            p.rect(0, 0, p.width, p.height);
            startTicks = currentTicks;
        }
    };
    p.mouseDragged = () => {
        if (c === 0) {
            return; // Skip function if c hasn't been set yet
        }
        let relX = p.mouseX / p.width;
        let relY = p.mouseY / p.height;
        let relPMouseX = p.pmouseX / p.width;
        let relPMouseY = p.pmouseY / p.height;
        let distance = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        let strokeWeightVal = detectMob() ? distance / 10 : distance / 30;
        strokeWeightVal = p.constrain(strokeWeightVal, 1, 20);
        p.stroke(c, 255, 255);
        p.strokeWeight(strokeWeightVal);
        p.line(relPMouseX * p.width, relPMouseY * p.height, relX * p.width, relY * p.height);
        let message = JSON.stringify({
            type: 'line',
            x1: relPMouseX,
            y1: relPMouseY,
            x2: relX,
            y2: relY,
            c: c,
            strokeWeight: strokeWeightVal
        });
        socket.send(message);
    };
};
new p5(s);
