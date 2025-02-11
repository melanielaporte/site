// Melanie Laporte
// github.com/melanielaporte
let stars = [];
let colorPicker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(10, height - 50);
}

function draw() {
  background(10, 10, 30, 50);
  
  if (random(1) < 0.2) {
    stars.push(new Star(random(width), 0, colorPicker.color()));
  }
  
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].update();
    stars[i].display();
    if (stars[i].offScreen()) {
      stars.splice(i, 1);
    }
  }
}

class Star {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.length = random(10, 30);
    this.speed = random(4, 10);
    this.color = color;
  }
  
  update() {
    this.y += this.speed;
  }
  
  display() {
    stroke(this.color);
    strokeWeight(8);
    line(this.x, this.y, this.x, this.y + this.length);
  }
  
  offScreen() {
    return this.y > height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  colorPicker.position(10, height - 50);
}