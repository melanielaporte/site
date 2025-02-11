// Melanie Laporte
// github.com/melanielaporte
// How I think anxiety would look.
let flowField = [];

function setup() {
  createCanvas(800, 800);
  noFill();
  generateFlowField();
}

function draw() {
  background(255, 10); 
  for (let i = 0; i < flowField.length; i++) {
    drawFlowingPattern(flowField[i].x, flowField[i].y, flowField[i].size);
  }
}

 function generateFlowField() {
  flowField = [];
  let cols = 8;
  let rows = 8;
  let spacing = width / cols;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * spacing + random(-10, 10);
      let y = j * spacing + random(-10, 10);
      let size = random(20, 80);
      flowField.push({ x, y, size });
    }
  }
}

 function drawFlowingPattern(x, y, size) {
  let layers = int(random(5, 15)); 
  for (let i = 0; i < layers; i++) {
    let offset = i * 3;
    let noiseFactor = random(0.05, 0.2);
    beginShape();
    for (let a = 0; a < TWO_PI; a += random(PI / 10, PI / 5)) {
      let radius = size + offset + noise(x * noiseFactor, y * noiseFactor) * 20;
      let vx = x + cos(a) * radius;
      let vy = y + sin(a) * radius;
      curveVertex(vx, vy);
    }
    endShape(CLOSE);
  }
}

 function mousePressed() {
  generateFlowField();
}