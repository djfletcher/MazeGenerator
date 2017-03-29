import createMaze from './algorithm';
import { drawMaze, mapCellsToWalls } from './draw_maze';
// import { mapCellsToWalls } from './draw_maze';
// import { drawMaze, animate } from './animate_maze_build';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;

  createAndDrawMaze(10);
  buttonsListening();
});

const createAndDrawMaze = difficulty => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maze = createMaze(difficulty);
  drawMaze(mapCellsToWalls(maze), ctx);
};

const buttonsListening = () => {
  const easy = document.getElementById("easy");
  const medium = document.getElementById("medium");
  const hard = document.getElementById("hard");
  const insane = document.getElementById("insane");

  easy.addEventListener("click", () => {
    changeDifficulty(5);
  });

  medium.addEventListener("click", () => {
    changeDifficulty(10);
  });

  hard.addEventListener("click", () => {
    changeDifficulty(30);
  });

  insane.addEventListener("click", () => {
    changeDifficulty(50);
  });
};

const changeDifficulty = difficulty => {
  createAndDrawMaze(difficulty);
};
