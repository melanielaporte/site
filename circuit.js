// Circuit Board Sim 
// Melanie Laporte
// github.com/melanielaporte
// Next steps: create a wired breadboard (either drawn or an uploaded image) with electrons that move around the board. 

let messageTop = "THANK YOU";
let messageBottom = "LEE!";
let font;
let electrons = [];
let pathways = [];
let powerOn = false;

function preload() {
  font = loadFont('SixtyfourConvergence-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(130);
  textAlign(CENTER, CENTER);
  strokeWeight(3);
  generatePathways();
  for (let i = 0; i < 30; i++) {
    electrons.push(new Electron());
  }
}

function draw() {
  background(20, 20, 20);
  drawCircuitBoard();
  fill(powerOn ? color(250) : color(100, 255, 100, 1)); //Adjust powerOn click fill color and base outline tranparency

  textSize(150);
  text(messageTop, width / 2, height / 3);
  text(messageBottom, width / 2, height / 1.8);

  for (let electron of electrons) {
    electron.update();
    electron.show();
  }
}

function generatePathways() {
  for (let i = 0; i < messageTop.length * 10 + messageBottom.length * 10; i++) {
    pathways.push(createVector(random(width), random(height)));
  }
}

function drawCircuitBoard() { 
  stroke(50, 255, 50);
  for (let i = 0; i < pathways.length - 1; i++) {
    line(pathways[i].x, pathways[i].y, pathways[i + 1].x, pathways[i + 1].y);
  }
}

class Electron {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.target = random(pathways);
    this.speed = random(2, 5);
  }

  update() {
    this.pos.lerp(this.target, 0.05);
    if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) < 5) {
      this.target = random(pathways);
    }
  }

  show() {
    fill(255, 255, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 8, 8);
  }
}

function mousePressed() {
  powerOn = !powerOn;
}