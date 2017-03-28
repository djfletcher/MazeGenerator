import { createGrid, carvePassagesFrom } from './algorithm';

function setup() {
  createCanvas(600, 400);
}

function draw() {

}

document.addEventListener("DOMContentLoaded", () => {

  window.setup = setup;
  window.draw = draw;

  const grid = createGrid(5, 5);
  console.log(grid);
  carvePassagesFrom(0, 0, grid);
  console.log(grid);
});
