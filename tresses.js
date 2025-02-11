// Melanie Laporte
// github.com/melanielaporte
// My stab at abstract art of sorts, a woman rooted. Pieces of her move but she remains in one place.
// Coordinating the vertexs was a vexing process but the result resembles 92% of my vision. 

let numStrands = 50; 

// Time variable for animation
let t = 0;  
// Length of each wave
let waveLength = 100;  
// Height of the waves
let waveAmplitude = 50; 

// Thickness of the hair strands
let strandThickness = 3; 


// Variables for face position
let faceX, faceY;

let hairColor; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  hairColor = color(117, 85, 101); 

  // Set the initial position of the face 
  faceX = width / 10; // Adjust the face on x-axis side to side
  faceY = height / 5; // Adjust the face on y-axis up and down
}

function draw() {
  background(206, 176, 171); 

  // Update time for smooth flow
  t += 0.10;

  // Calculate the starting x position to center the hair horizontally on screen
  let startX = width / 5; // Center horizontally
  let startY = 0; // Start at the top of  screen to bottom

  stroke(hairColor);
  
  // Draw hair strands
  for (let i = 0; i < numStrands; i++) {
    let offset = map(i, 0, numStrands, -200, 200); // Create slight variation between strands
    drawHair(startX + i * 10, startY, offset);  // Call the hair drawing function
  }

  // Draw face 
  drawFace(faceX, faceY);
  stroke(0);
  noFill();
}

function drawHair(x, y, offset) {
  strokeWeight(strandThickness);

  // Draw multiple layers for thicker strands
  for (let j = -3; j <= 3; j++) {
    beginShape();
    // Perlin noise-based smooth flow movement with connected waves
    for (let i = 0; i <= waveLength * 10; i++) {
      let waveIndex = i / waveLength; // Calculate wave index
      let x1 = x + j + sin(TWO_PI * waveIndex) * waveAmplitude + noise(t + waveIndex + offset) * 20; // X-coordinate with sin wave
      let y1 = y + i * 5; // Increase y to create the hair length

      curveVertex(x1, y1);  // Smoothly connect the points so not choppy
    }
    endShape();
  }
}

function drawMouth() {
  fill(239, 183, 158, 180); 
  noStroke();

  // TOP lip with cupid's bow
  beginShape();
  vertex(620 + 275, 270); 
  bezierVertex(635 + 275, 265, 655 + 275, 265, 670 + 275, 270); 
  vertex(670 + 275, 270); 
  endShape(CLOSE);

  // BOTTOM lip 
  beginShape();
  vertex(620 + 275, 270);
  bezierVertex(640 + 275, 290, 650 + 275, 290, 670 + 275, 270); 
  endShape(CLOSE);
}

function drawFace(x, y) {
  noStroke();
  fill(146, 72, 37, 90);

  beginShape();
  vertex(745 + 210, 15);
  vertex(760 + 210, 50);
  vertex(767 + 210, 85);
  vertex(767 + 210, 120);
  vertex(758 + 210, 150);
  vertex(761 + 210, 185);
  vertex(761 + 210, 220);
  vertex(749 + 210, 250);
  vertex(737 + 210, 277);
  vertex(728 + 210, 300);
  vertex(715 + 210, 326);
  vertex(682 + 210, 332);
  vertex(645 + 210, 324);
  vertex(610 + 210, 310);
  vertex(580 + 210, 290);
  vertex(555 + 210, 268);
  vertex(540 + 210, 238);
  vertex(536 + 210, 200);
  vertex(528 + 210, 180);
  vertex(540 + 210, 123);
  vertex(565 + 210, 100);
  vertex(595 + 210, 75);
  vertex(622 + 210, 55);
  vertex(650 + 210, 35);
  vertex(680 + 210, 15);
  vertex(720 + 210, 8);
  endShape(CLOSE);

  fill(31, 115, 135, 189);
  beginShape();
  vertex(200 + 525, 415 - 190);
  vertex(200 + 525, 443 - 190);
  vertex(198 + 525, 473 - 190);
  vertex(190 + 525, 502 - 190);
  vertex(173 + 525, 533 - 190);
  vertex(146 + 525, 547 - 190);
  vertex(198 + 525, 473 - 190);
  vertex(132 + 525, 568 - 190);
  vertex(140 + 525, 602 - 190);
  vertex(155 + 525, 638 - 190);
  vertex(180 + 525, 665 - 190);
  vertex(217 + 525, 680 - 190);
  vertex(255 + 525, 690 - 190);
  vertex(287 + 525, 695 - 190);
  vertex(320 + 525, 690 - 190);
  vertex(360 + 525, 680 - 190);
  vertex(390 + 525, 665 - 190);
  vertex(415 + 525, 638 - 190);
  vertex(427 + 525, 602 - 190);
  vertex(430 + 525, 568 - 190);
  vertex(415 + 525, 545 - 190);
  vertex(400 + 525, 528 - 190);
  vertex(382 + 525, 532 - 190);
  vertex(345 + 525, 524 - 190);
  vertex(310 + 525, 510 - 190);
  vertex(280 + 525, 490 - 190);
  vertex(255 + 525, 468 - 190);
  vertex(240 + 525, 438 - 190);
  vertex(236 + 525, 400 - 190);
  vertex(228 + 525, 380 - 190);
  vertex(210 + 525, 394 - 190);
  endShape(CLOSE);

  drawMouth();
}