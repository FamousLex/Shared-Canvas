let socket = new WebSocket("ws://mediatedspaces.net:7777");

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 5000;
// canvas.height = 5000;
const particlesArray =[]; //array that holds all particles
let hue = 0;
let mouseDown = false;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('onOrientationChange', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
}

canvas.addEventListener('mousedown', function(event){
  mouseDown = true;
  console.log('mousedown');
});

canvas.addEventListener('mouseup', function(event){
  mouseDown = false;
});

canvas.addEventListener('touchstart', function(event){
  mouseDown = true;
  console.log('mousedown');
});

canvas.addEventListener('touchend', function(event){
  mouseDown = false;
});

var now = new Date();
var ticks = now.getTime();

canvas.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse.x, mouse.y);
  let mouseXPercent = mouse.x / window.innerWidth;
  let mouseYPercent = mouse.y / window.innerHeight;
  // console.log(mouseXPercent, mouseYPercent);
  let message = '{"x":' + mouseXPercent + ', "y":' + mouseYPercent + '}';
  if(mouseDown){
    socket.send(message);
    particlesArray.push(new Particle(mouse.x, mouse.y));   
  }
});


canvas.addEventListener('touchmove', function(event){
  let touchX = event.touches[0].clientX;
  let touchY = event.touches[0].clientY;
  let touchXPercent = touchX / window.innerWidth;
  let touchYPercent = touchY / window.innerHeight;
  let message = '{"x":' + touchXPercent + ', "y":' + touchYPercent + '}';
  socket.send(message);
  if(mouseDown){
        particlesArray.push(new Particle(mouse.x, mouse.y));
      }
});

socket.onopen = function(e) {
  console.log("[open] Connection established");
};

socket.onmessage = function(event) {
  let incoming = JSON.parse(event.data);
  let xPos = incoming.x * window.innerWidth;
  let yPos = incoming.y * window.innerHeight;
  particlesArray.push(new Particle(xPos, yPos));
  // console.log(xPos);
  console.log(particlesArray.length);
}

class Particle{
  constructor(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.size = 20;
    this.color = 'hsl(' + hue +', 100%, 50%)';
    this.alp = 50;
    }
    
    update(){
        this.alp = this.alp - 1;
    }

    draw(){
      ctx.fillStyle = 'hsl(' + hue + ', 100%, ' + this.alp + '% )'; //color of particles
      ctx.beginPath(); // start drawing on canvas
      // ctx.moveTo(this.x,this.y);
      // ctx.lineTo(this.x, this.y);
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);//X and Y co-ordinate, radius, start angle, end angle
      ctx.fill();//fill the path with colorx
      ctx.closePath();
      drawLine();
    }
}

function drawLine(){
  for (let i = 0; i < particlesArray.length - 1; i++){
    let temp = particlesArray[i].alp;
    // ctx.strokeStyle = 'rgba(255, 120, 255,' + temp + ')';
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
    ctx.lineTo(particlesArray[i + 1].x, particlesArray[i + 1].y);
    ctx.stroke();
    ctx.closePath();
  }
}

function handleParticles(){
  for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].alp <= 0.3){
        particlesArray.splice(i, 1);
        i--;
    }
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);//clears all the old paint i.e no path is created.
  ctx.fillStyle = 'rgba(0,0,0,0.1)';//a-alpha i.e opacity (lesser it is, stays longer on screen)
  ctx.fillRect(0,0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();