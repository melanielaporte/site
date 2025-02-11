// Melanie Laporte
// github.com/melanielaporte
let t = 0;

function setup() {
  createCanvas(400, 400);
  noFill();
  stroke(255, 105, 180);
  strokeWeight(2);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let maxDepth = 6;
  let angleOffset = t * 0.02;
  drawBloomingFractal(0, 0, 100, maxDepth, angleOffset);
  
  t += 0.05;
}

function drawBloomingFractal(x, y, size, depth, angleOffset) {
  if (depth == 0) return;
  
  for (let i = 0; i < 6; i++) {
    let angle = angleOffset + TWO_PI * i / 6;
    let xOffset = cos(angle) * size;
    let yOffset = sin(angle) * size;
    
    ellipse(x + xOffset, y + yOffset, size * 0.5, size * 0.5);
    drawBloomingFractal(x + xOffset, y + yOffset, size * 0.5, depth - 1, angleOffset);
  }
}