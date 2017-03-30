import { drawMaze, mapCellsToWalls } from './draw_maze';
// import { mapCellsToWalls } from './draw_maze';
// import { drawMaze, animate } from './animate_maze_build';
// import { drawCircle, moveCircle } from './player';
// import { buttonsListening } from './difficulty';
import Circle from './player';
import Maze from './maze';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');

  // createAndDrawMaze(10);
  const difficulty = 10;
  const maze = new Maze(difficulty, ctx);
  maze.createMaze();
  maze.mapCellsToWalls();
  // drawMaze(mapCellsToWalls(maze), ctx);

  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const r = 70;
  const player = new Circle(x, y, r, ctx);

  buttonsListening();

  const game = new Game(maze, player, ctx);
  game.draw();

  // player.drawCircle();
});

const createAndDrawMaze = difficulty => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maze = new Maze(difficulty, ctx);
  maze.createMaze();
  maze.mapCellsToWalls();

  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const r = 70;
  const player = new Circle(x, y, r, ctx);

  buttonsListening();

  const game = new Game(maze, player, ctx);
  game.draw();
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
