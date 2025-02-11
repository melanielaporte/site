// Melanie Laporte
// github.com/melanielaporte
let message = "in bloom";
let ink = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(60);
  textAlign(CENTER, CENTER);
  fill(255, 204, 0);
}

function draw() {
  background(255, 245, 235); 
  
  for (let i = ink.length - 1; i >= 0; i--) {
    ink[i].update();
    ink[i].show();
    
    if (ink[i].alpha <= 0) {
      ink.splice(i, 1);
    }
  }
  
  text(message, width / 2, height / 2);
}

function mousePressed() {

	let newInk = new Ink(mouseX, mouseY);
  ink.push(newInk);
}


class Ink {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 1;
    this.alpha = 255;
    this.color = color(random(150, 255), random(100, 200), random(150, 255), this.alpha); // Pastel colors
  }
  
  update() {
    this.size += 5;  
    this.alpha -= 2;  
    
    this.color = color(red(this.color) + random(-10, 10), green(this.color) + random(-10, 10), blue(this.color) + random(-10, 10), this.alpha);
  }
  
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}