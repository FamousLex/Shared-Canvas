"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let socket = new WebSocket("ws://localhost:3000"); //make me a socket
let c; // color variable
let mySound;
let dragSound;
let pg;
let colorPicker;
var now = new Date();
var startTicks = now.getTime();
function preload() {
    // soundFormats('mp3', 'wav');
    // mySound = loadSound('PS2.wav'); //load before all else
    // dragSound = loadSound('fx.wav');
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    background(0);
    c = random(255); //random color
    noStroke();
    colorPicker = createColorPicker('#ed225d');
    colorPicker.position(0, height + 5);
}
function detectMob() {
    if ((window.innerWidth <= 800) && (window.innerHeight <= 600)) {
        return true;
    }
    else {
        return false;
    }
}
;
const bodyElement = document.getElementById('body');
if (bodyElement !== null) {
    bodyElement.ontouchend = (e) => {
        e.preventDefault();
    };
}
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight, true);
//   }
function draw() {
    var currentNow = new Date();
    var currentTicks = currentNow.getTime();
    if (currentTicks - startTicks >= 500) {
        noStroke();
        fill(0, 20);
        rect(0, 0, width, height);
        startTicks = currentTicks;
    }
}
socket.onopen = function (e) {
    console.log("connection established!!!!!"); //confirming message
    // mySound.play();
};
socket.onmessage = function (e) {
    let message = JSON.parse(e.data);
    if (message.type === 'line') {
        stroke(message.c, 255, 255);
        strokeWeight(message.strokeWeight);
        line(message.x1 * width, message.y1 * height, message.x2 * width, message.y2 * height);
    }
};
function mouseDragged() {
    let relX = mouseX / width;
    let relY = mouseY / height;
    let relPMouseX = pmouseX / width;
    let relPMouseY = pmouseY / height;
    let distance = dist(mouseX, mouseY, pmouseX, pmouseY);
    let strokeWeightVal = detectMob() ? distance / 10 : distance / 30;
    strokeWeightVal = constrain(strokeWeightVal, 1, 20);
    stroke(c, 255, 255);
    strokeWeight(strokeWeightVal);
    line(pmouseX, pmouseY, mouseX, mouseY);
    // let pbRate = map(mouseY, height, 0, .25, 2.);
    // let rlSpace = map(mouseX, 0., width, -1., 1.);
    // dragSound.rate(pbRate);
    // dragSound.pan(rlSpace);
    // dragSound.play();
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
}
