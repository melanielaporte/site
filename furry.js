// Melanie Laporte
// github.com/melanielaporte
// Here's my tutorial of how to make furry letters. The upgrade is to make letters covered in noodles. 

let font;
let points;
let windOffset = 0;

// Load your font - make sure to add it in the Files area
function preload() {
  font = loadFont('/assets/fonts/Arial.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTextPoints();
}

function draw() {
  background(30);

  // Adding the fur effect!
  for (let p of points) {
    for (let i = 0; i < 100; i++) { // More lines = thicker fur
      let angle = random(TWO_PI); // Random direction
      let len = random(10, 35); // Varying fur length
      let xOff = cos(angle) * len;
      let yOff = sin(angle) * len;

      stroke(255, random(150, 255), random(150, 255), random(80, 200));
      strokeWeight(random(1, 3)); // Fur thickness variation
      line(p.x + random(-3, 3), p.y + random(-3, 3), p.x + xOff, p.y + yOff);
    }
  }

  windOffset += 0.01; // Wind effect for movement, like wind blowing
}

// Responsive -> this recalculates text position when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateTextPoints();
}

function generateTextPoints() {
  points = [];
  let textToConvert = 'F u r r y';
  let spaceWidth = 10; // Space between letters
  
  // Center the text
  let totalWidth = 0;
  for (let i = 0; i < textToConvert.length; i++) {
    let letter = textToConvert.charAt(i);
    let letterBounds = font.textBounds(letter, 0, 0, min(width, height) * 0.2);
    totalWidth += letterBounds.w + spaceWidth;
  }

  // Set startX to center the text horizontally
  let startX = (width - totalWidth) / 2;

  // Loop through each character in the text
  for (let i = 0; i < textToConvert.length; i++) {
    let letter = textToConvert.charAt(i);
    let letterPoints = font.textToPoints(letter, startX, height * 0.6, min(width, height) * 0.2, { 
      sampleFactor: 0.3, 
      simplifyThreshold: 0
    });

    points = points.concat(letterPoints);
    startX += font.textBounds(letter, 0, 0, min(width, height) * 0.2).w + spaceWidth;
  }
}