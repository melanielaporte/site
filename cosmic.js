// Melanie Laporte
// github.com/melanielaporte
function setup() {
    let canvas = createCanvas(1200, 900);
    canvas.parent('cosmic-canvas'); // Attach canvas to the div with id "cosmic-canvas"
    noFill();
    frameRate(30);
}
  
  function draw() {
    background(10, 10, 30, 50);
    let t = frameCount * 0.02;
    
    translate(width / 2, height / 2);
    
    for (let i = 0; i < 10; i++) {
      let angle = TWO_PI * (i / 10) + t;
      let x = cos(angle) * (150 + sin(t * 2) * 80);
      let y = sin(angle) * (150 + cos(t * 2) * 80);
      
      let ballSize = 30 + sin(t + i) * 30;
      let glow = map(ballSize, 10, 70, 50, 255);
      
      push();
      stroke(188,	75,	197, glow);
      strokeWeight(5);
      ellipse(x, y, ballSize);
      pop();
    }
    
    stroke(255, 200);
    strokeWeight(1);
    for (let i = 0; i < 100; i++) {
      let x = random(-width / 2, width / 2);
      let y = random(-height / 2, height / 2);
      point(x, y);
    }
  }