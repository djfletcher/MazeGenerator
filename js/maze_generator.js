import createMaze from './algorithm';
// import { drawMaze, mapCellsToWalls } from './draw_maze';
import { mapCellsToWalls } from './draw_maze';
import { drawMaze, animate } from './animate_maze_build';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');

  const difficulty = 50;
  const maze = createMaze(difficulty);

  drawMaze(mapCellsToWalls(maze), ctx);
});
