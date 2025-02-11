// Melanie Laporte 
// github.com/melanielaporte
// I have fallen in love with creating art with code!
// Music: Dove by Cymande -> The song is copyrighted, I'll change it later.

let particles = [];
let message1 = "THANK YOU";  
let message2 = "PROFESSOR ALLY!";  
let points = [];
let font;
let formedLetters = [];
let goSound;

function preload() {
  goSound = loadSound('music.wav'); 
  font = loadFont('BagelFatOne-Regular.ttf'); 
}


function setup() {
  createCanvas(windowWidth, windowHeight);  
  textSize(160);
  fill(255);
  textAlign(CENTER, CENTER);


	let xStart1 = width / 2 - textWidth(message1) / 2;  
  let yStart1 = height / 3; 

  let xStart2 = width / 2 - textWidth(message2) / 2;  
  let yStart2 = height / 2 + 50;  


	for (let i = 0; i < message1.length; i++) {
    let charX = xStart1 + textWidth(message1.substring(0, i)) + textWidth(message1.charAt(i)) / 2;
    

		if (message1.charAt(i) !== " ") {
      let charPoints = font.textToPoints(message1.charAt(i), charX, yStart1, 160, {
        sampleFactor: 0.1,   
        simplifyThreshold: 0
      });

      points.push(charPoints);
    }
  }


	for (let i = 0; i < message2.length; i++) {
    let charX = xStart2 + textWidth(message2.substring(0, i)) + textWidth(message2.charAt(i)) / 2;
    

		if (message2.charAt(i) !== " ") {
      let charPoints = font.textToPoints(message2.charAt(i), charX, yStart2, 160, {
        sampleFactor: 0.1,   
        simplifyThreshold: 0
      });

      points.push(charPoints);
    }
  }

   for (let ptArray of points) {
    for (let pt of ptArray) {
      let numParticles = 10; 
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(pt.x, pt.y));
      }
    }
  }
}

function draw() {
  background(0);

  for (let p of particles) {
    p.update();
    p.show();
  }
}

// User needs to click for sound
function mousePressed() {
  if (goSound.isLoaded() && !goSound.isPlaying()) {
    goSound.play();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));   
    this.target = createVector(x, y);   
    this.vel = p5.Vector.random2D().mult(1);  
    this.acc = createVector();
    this.r = 2;   
    this.arrived = false;
    this.repelled = false;  
  }

  update() {
    if (!this.arrived) {
      let force = p5.Vector.sub(this.target, this.pos);
      let distance = force.mag();


			if (distance < 2) {
        this.arrived = true;
        this.pos = this.target.copy();
      }

      force.setMag(0.05);  
      this.acc.add(force);
      this.vel.add(this.acc);
      this.vel.limit(2);   
      this.pos.add(this.vel);  
      this.acc.mult(0);  
    } else if (!this.repelled) {

			let repulsion = p5.Vector.random2D().mult(2); 
      this.vel.add(repulsion);
      this.vel.limit(4);  
      this.pos.add(this.vel);  

      this.repelled = true;  
    }
  }

  show() {
    noStroke();
    fill(255, 204, 0);   
    ellipse(this.pos.x, this.pos.y, this.r * 2);   
  }
}