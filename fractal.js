// Melanie Laporte
// github.com/melanielaporte
let nodes = [];
let numNodes = 120;
let minDist = 30;
let maxDist = 150;
let noiseFactor = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  
  for (let i = 0; i < numNodes; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    let z = random(-width / 4, width / 4);
    nodes.push(createVector(x, y, z));
  }
}

function draw() {
  orbitControl();
  background(0);
  
  for (let i = 0; i < nodes.length; i++) {
    let nodeA = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      let nodeB = nodes[j];
      let d = dist(nodeA.x, nodeA.y, nodeA.z, nodeB.x, nodeB.y, nodeB.z);

      if (d < maxDist && d > minDist) {
        let colorVal = map(d, minDist, maxDist, 255, 50);
        stroke(colorVal, 100, 255 - colorVal);
        line(nodeA.x, nodeA.y, nodeA.z, nodeB.x, nodeB.y, nodeB.z);
      }
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    let force = createVector(0, 0, 0);
    
    for (let j = 0; j < nodes.length; j++) {
      if (i != j) {
        let otherNode = nodes[j];
        let d = dist(node.x, node.y, node.z, otherNode.x, otherNode.y, otherNode.z);
        
        if (d < maxDist && d > minDist) {
          let angleX = atan2(node.y - otherNode.y, node.z - otherNode.z);
          let angleY = atan2(node.z - otherNode.z, node.x - otherNode.x);
          let angleZ = atan2(node.x - otherNode.x, node.y - otherNode.y);
          let f = map(d, minDist, maxDist, 0.05, 0);
          
          force.x += cos(angleY) * sin(angleZ) * f;
          force.y += sin(angleX) * cos(angleZ) * f;
          force.z += cos(angleX) * sin(angleY) * f;
        }
      }
    }

    node.add(force);
    node.x += sin(noiseFactor) * 2; 
    node.y += cos(noiseFactor) * 2;
    node.z += sin(noiseFactor * 0.5) * 2;
    
    node.x = constrain(node.x, -width / 2, width / 2);
    node.y = constrain(node.y, -height / 2, height / 2);
    node.z = constrain(node.z, -width / 4, width / 4);

    let nodeSize = map(sin(noiseFactor * 0.3), -1, 1, 2, 5);
    let col = color(map(node.x, -width / 2, width / 2, 100, 255), 100, 255);
    
    noStroke();
    fill(col);
    push();
    translate(node.x, node.y, node.z);
    sphere(nodeSize);
    pop();
  }
  noiseFactor += 0.02; 
}
