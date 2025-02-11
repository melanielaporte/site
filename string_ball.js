// Melanie Laporte
// github.com/melanielaporte
// This was a fun one to create, based off a beginner's OP tutorial. 
// Next steps: make the string ball bounce.
// Adjusts number of bloom particles
const TOTAL = 900;
let particles = [];   
let innerSize = 20; // Adjusts core size

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('string-ball-canvas'); // Attach canvas to the div with id "string-ball-canvas"
    for (let i = 0; i < TOTAL; i++) {
        particles.push({
            pos: createVector(width / 2, height / 2),
            dir: random(TWO_PI),
            speed: random(1, 4), // Adjust bloom speed
            color: color(random(255), random(255), random(255)),
            life: 255 
        });
    }
}


function draw() {
    background(0, 20); 

    // Inner core growth speed
    let mouseDist = dist(mouseX, mouseY, width / 2, height / 2);
    let growthRate = map(mouseDist, 0, width / 2, 0.005, 0.005);  
    innerSize += growthRate;

    drawingContext.filter = 'blur(20px)'; 
    fill(255, 150); 
    noStroke();
    circle(width / 2, height / 2, innerSize);

    drawingContext.filter = 'none';

    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i]; // Renamed to 'particle'

        let centerPoint = createVector(width / 2, height / 2); 
        let force = p5.Vector.sub(centerPoint, particle.pos);
        force.setMag(0.05);
        particle.pos.add(force);

        // Mouse touch
        let mouse = createVector(mouseX, mouseY);
        let d = dist(particle.pos.x, particle.pos.y, mouse.x, mouse.y);
        if (d < 100) {
            let repel = p5.Vector.sub(particle.pos, mouse);
            repel.setMag(1);
            particle.pos.add(repel);
        }

        particle.pos.x += cos(particle.dir) * particle.speed;
        particle.pos.y += sin(particle.dir) * particle.speed;

        particle.life -= .8; // control bloom fade
        if (particle.life <= 0) {
            // Reset particle back to the center
            particle.pos = createVector(width / 2, height / 2);
            particle.life = 255;
        }

        fill(red(particle.color), green(particle.color), blue(particle.color), particle.life);
        noStroke();
        circle(particle.pos.x, particle.pos.y, 20); // Adjust particle thickness

    }
}