let socket = new WebSocket("ws://54.82.40.33:3000"); //make me a socket
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
    if(( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 )){
        return true;
    }
    else {
        return false;
    }
};


document.getElementById('body').ontouchend = (e) => {
    e.preventDefault();
};

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight, true);
//   }

function draw() {
    var currentNow = new Date();
    var currentTicks = currentNow.getTime();
    if (currentTicks - startTicks >= 500){
        noStroke();
        fill(0, 20);
        rect(0, 0, width, height);
        startTicks = currentTicks;
    }


}

socket.onopen = function(e) {
    console.log("connection established!!!!!"); //confirming message
    // mySound.play();
}

socket.onmessage = function(e) {
    let message = JSON.parse(e.data);
    fill(message.c, 255, 255);
    circle(message.relX * width, message.relY * height, message.circleDiameter);
    // let pbRate = map(message.x, height, 0, .25, 2.);
    // let rlSpace = map(message.y, 0., width, -1., 1.);
    // console.log(pbRate);
    // dragSound.rate(pbRate);
    // dragSound.pan(rlSpace);
    // console.log(message.width);
    console.log("received: " + message.circleDiameter);
}

function mouseDragged() {
    let relX = mouseX / width;
    let relY = mouseY / height;
    let relPMouseX = pmouseX / width;
    let relPMouseY = pmouseY / height;
    let distanceX = relX + 50 - relPMouseX * Math.floor(Math.random() * 100);
    let distanceY = relY + 50 - relPMouseY * Math.floor(Math.random() * 100);
    let distanceXY = distanceX * distanceY / 10;
    let circleDiameter;
    if(detectMob()){
        circleDiameter = width / 40 * distanceXY / 150;
    }
    else{
        circleDiameter = width / 40 * distanceXY / 450;
    };
    if (isNaN(circleDiameter)){
        return "not a number";
        circleDiameter = 1;
    };

    console.log("local: " + circleDiameter);
    // let pbRate = map(mouseY, height, 0, .25, 2.);
    // let rlSpace = map(mouseX, 0., width, -1., 1.);
    // dragSound.rate(pbRate);
    // dragSound.pan(rlSpace);
    // dragSound.play();
    fill(c, 255, 255); //c (hue) is randomized at start
    circle(mouseX, mouseY, circleDiameter); //draw local stroke
    let message = '{"x":' + mouseX + ', "y":' + mouseY + ', "c":' + c + ', "relX":' + relX + ', "relY":' + relY + ', "width":' + width + ', "circleDiameter":' + circleDiameter + '}';
    socket.send(message);
}