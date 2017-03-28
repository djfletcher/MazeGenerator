import { createGrid, carvePassagesFrom } from './algorithm';
import { drawGrid, getCoordinates, drawMaze } from './draw_maze';


document.addEventListener("DOMContentLoaded", () => {
  // window.setup = setup;
  // window.draw = draw;

  // canvas width and height
  const cWidth = 500;
  const cHeight = 500;

  const canvas = document.getElementById('canvas');
  canvas.width = cWidth;
  canvas.height = cHeight;

  const ctx = canvas.getContext('2d');
  drawGrid(cWidth, cHeight, ctx);

  const grid = createGrid(5, 5);
  carvePassagesFrom(0, 0, grid);
  const coords = getCoordinates(grid);

  drawMaze(ctx, coords);
});
