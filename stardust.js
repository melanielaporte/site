// Melanie Laporte
// github.com/melanielaporte
var particlesQuantity = 18000;

var positionX = new Array(particlesQuantity);
var positionY = new Array(particlesQuantity);
var velocityX = new Array(particlesQuantity).fill(0);
var velocityY = new Array(particlesQuantity).fill(0);

let sizeSlider, quantitySlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  
  sizeSlider = createSlider(1, 10, 3);
  quantitySlider = createSlider(1000, 20000, 18000);
  sizeSlider.position(20, height - 40);
  quantitySlider.position(20, height - 80);

  for (var particle = 1; particle < particlesQuantity; particle++) {
    positionX[particle] = random(0, width);
    positionY[particle] = random(0, height);
  }

  positionX[0] = 0;
  positionY[0] = 0;
}

function draw() {
  let dynamicTime = frameCount * 0.01; 
  let red = (sin(dynamicTime) + 1) * 80;
  let green = (cos(dynamicTime) + 1) * 80;
  background(red, green, 180);

  particlesQuantity = quantitySlider.value();
  let particleSize = sizeSlider.value();

  velocityX[0] = velocityX[0] * 0.5 + (mouseX - positionX[0]) * 0.1;
  velocityY[0] = velocityY[0] * 0.5 + (mouseY - positionY[0]) * 0.1;
  positionX[0] += velocityX[0];
  positionY[0] += velocityY[0];

  for (var particle = 1; particle < particlesQuantity; particle++) {
    var r = map(positionX[particle], 0, width, 50, 200);
    var g = map(positionY[particle], 0, height, 50, 200);
    var b = map(velocityX[particle], -5, 5, 50, 200);
    stroke(r, g, b);

    var whatever = 1024 / (sq(positionX[0] - positionX[particle]) + sq(positionY[0] - positionY[particle]));
    velocityX[particle] = velocityX[particle] * 0.95 + (velocityX[0] - velocityX[particle]) * whatever;
    velocityY[particle] = velocityY[particle] * 0.95 + (velocityY[0] - velocityY[particle]) * whatever;
    positionX[particle] += velocityX[particle];
    positionY[particle] += velocityY[particle];

    if ((positionX[particle] < 0 && velocityX[particle] < 0) || (positionX[particle] > width && velocityX[particle] > 0)) {
      velocityX[particle] = -velocityX[particle];
    }

    if ((positionY[particle] < 0 && velocityY[particle] < 0) || (positionY[particle] > height && velocityY[particle] > 0)) {
      velocityY[particle] = -velocityY[particle];
    }

    ellipse(positionX[particle], positionY[particle], particleSize, particleSize);
  }
}

function mousePressed() {
  for (var particle = 1; particle < particlesQuantity; particle++) {
    positionX[particle] = random(0, width);
    positionY[particle] = random(0, height);
  }
}