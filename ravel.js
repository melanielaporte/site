// Melanie Laporte
// github.com/melanielaporte
let particles = [];
let noiseScale = 0.005;
let particleCount = 300;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < particleCount; i++) { 
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
  }

  update() {
    let angle = noise(this.pos.x * noiseScale, this.pos.y * noiseScale) * TWO_PI * 4;
    let force = p5.Vector.fromAngle(angle);
    let col = color(map(this.pos.x, 0, width, 100, 255), 100, map(this.pos.y, 0, height, 255, 100), 50);
    stroke(col);
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
 // strokes
  show() {
    stroke(0, 80); 
    strokeWeight(1);
    noFill();
    point(this.pos.x, this.pos.y);
  }
}

function mousePressed() {
  background(255, 209, 125, 40); 
  particleCount += 200; 
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}