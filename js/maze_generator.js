import { createGrid, carvePassagesFrom } from './algorithm';
//
// function setup() {}
// function draw() {}
// function beginShape() {}
// function vertex() {}
// function endShape() {}
// function noFill() {}

const drawMaze = grid => {
  const coords = { x: 30, y: 30 };
  const vertices = [[30, 20]];

  grid.forEach(row => {
    row.forEach(square => {
      switch(square) {
        case 'n':
          coords.y += 10;
          vertices.push([coords.x, coords.y]);
        case 's':
          coords.y -= 10;
          vertices.push([coords.x, coords.y]);
        case 'w':
          coords.x += 10;
          vertices.push([coords.x, coords.y]);
        case 'e':
          coords.x -= 10;
          vertices.push([coords.x, coords.y]);
      }
    });

    debugger;
    setup(vertices);
  });
};


function setup(vertices) {
  noFill();
  beginShape();
  debugger;
  vertices.forEach(v => vertex(...v));
  endShape();
}

// function setup(vertices) {
//   noFill();
//   beginShape();
//   vertex(30, 20);
//   vertex(85, 20);
//   vertex(85, 75);
//   vertex(30, 75);
//   endShape();
// }

// function draw(vertices) {
//   // debugger;
//   noFill();
//   beginShape();
//   vertices.forEach(v => vertex(...v));
//   endShape();
// }

document.addEventListener("DOMContentLoaded", () => {

  window.setup = setup;
  // window.draw = draw;
  // window.noFill = noFill;
  // window.beginShape = beginShape;
  // window.vertex = vertex;
  //

  const grid = createGrid(5, 5);
  console.log(grid);
  carvePassagesFrom(0, 0, grid);
  console.log(grid);
  drawMaze(grid);
});
