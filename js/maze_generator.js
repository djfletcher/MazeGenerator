import { createGrid, carvePassagesFrom } from './algorithm';
import { drawGrid, getCoordinates, drawMaze, locateCells, mapCellsToWalls } from './draw_maze';


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

  const grid = createGrid(5, 5);
  carvePassagesFrom(0, 0, grid);
  // console.log(grid);
  // drawGrid(cWidth, cHeight, ctx);

  // const coords = getCoordinates(grid);

  // drawMaze(ctx, coords);
  // locateCells(grid, ctx);
  console.log(grid);
  const newGrid = mapCellsToWalls(grid);
  console.log(newGrid);
  drawMaze(newGrid, ctx);
});
