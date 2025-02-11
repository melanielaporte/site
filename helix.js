// Melanie Laporte
// github.com/melanielaporte
// This project took FOREVER but almost resembles my vision. 
// Next steps: transform all lines to consist of tiny circles.
let angle = 0;
let helixRadius = 100;
let helixHeight = 500;   
let numStrands = 2;
let numRungs = 15;   

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(255, 213, 182);
  
   strokeWeight(4);  

  rotateY(angle);   

   for (let i = 0; i < numRungs; i++) {
    let t = map(i, 0, numRungs - 1, 0, TWO_PI);

     let x1 = helixRadius * cos(t);
    let y1 = map(i, 0, numRungs - 1, -helixHeight / 2, helixHeight / 2);  
    let z1 = helixRadius * sin(t);

    let x2 = helixRadius * cos(t + PI);  
    let y2 = y1;
    let z2 = helixRadius * sin(t + PI);

    if (i < numRungs - 1) {
      let nextT = map(i + 1, 0, numRungs - 1, 0, TWO_PI);
      
      let nextX1 = helixRadius * cos(nextT);
      let nextY1 = map(i + 1, 0, numRungs - 1, -helixHeight / 2, helixHeight / 2);
      let nextZ1 = helixRadius * sin(nextT);

      let nextX2 = helixRadius * cos(nextT + PI);
      let nextY2 = nextY1;
      let nextZ2 = helixRadius * sin(nextT + PI);

       line(x1, y1, z1, nextX1, nextY1, nextZ1);
      line(x2, y2, z2, nextX2, nextY2, nextZ2);
      
       line(x1, y1, z1, x2, y2, z2);  
    }
  }

   angle += 0.02;   
  if (angle > TWO_PI) {
    angle = 0;   
  }
}