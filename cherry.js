// Melanie Laporte
// github.com/melanielaporte
let petals = [];
let petalImage;
let petalCount = 0;
let maxPetals = 100;
let minPetals = 25;
let petalVariance = 10;  

function preload() {
  petalImage = loadImage('cherryBlossom.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

	for (let i = 0; i < minPetals; i++) {
    let petal = new Petal(random(width), random(-100, -50)); 
    petals.push(petal);
  }
}

function draw() {
  background(173, 216, 230); 

  for (let i = petals.length - 1; i >= 0; i--) {
    petals[i].update();
    petals[i].show();

    if (petals[i].y > height) {
      petals.splice(i, 1);
    }
  }

  if (petalCount % petalVariance === 0) {
    let newPetals = int(random(minPetals, maxPetals)); 
    for (let i = 0; i < newPetals; i++) {
      petals.push(new Petal(random(width), random(-100, -50))); 
    }
  }
  
  petalCount++;
}

class Petal {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(1, 3)); 
    this.acc = createVector();
    this.size = random(15, 30); 
    this.image = petalImage;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0); //
  }

  show() {
    imageMode(CENTER);
    image(this.image, this.pos.x, this.pos.y, this.size, this.size); 
  }
}