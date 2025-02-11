// Melanie Laporte
// github.com/melanielaporte
let particles = [];
let colorPicker, shapeSelector;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 30);
  
  // Legend at page bottom edge
  colorPicker = createColorPicker('#ff66b2');
  colorPicker.position(10, height - 50);
  
  shapeSelector = createSelect();
  shapeSelector.position(160, height - 50);
  shapeSelector.option('Circle');
  shapeSelector.option('Square');
  shapeSelector.option('Triangle');
  shapeSelector.option('Star');
  shapeSelector.selected('Circle');
}

function draw() {
  background(10, 10, 30, 20);
  let p = new Particle(mouseX, mouseY, colorPicker.color(), shapeSelector.value());
  particles.push(p);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFaded()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, color, shape) {
    this.x = x;
    this.y = y;
    this.size = random(20, 70);
    this.alpha = 255;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.color = color;
    this.shape = shape;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 4;
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    
    if (this.shape === 'Circle') {
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shape === 'Square') {
      rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else if (this.shape === 'Triangle') {
      triangle(
        this.x, this.y - this.size / 2,
        this.x - this.size / 2, this.y + this.size / 2,
        this.x + this.size / 2, this.y + this.size / 2
      );
    } else if (this.shape === 'Star') {
      this.drawStar(this.x, this.y, this.size / 2, this.size, 5);
    }
  }

  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  isFaded() {
    return this.alpha <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  colorPicker.position(10, height - 50);
  shapeSelector.position(160, height - 50);
}