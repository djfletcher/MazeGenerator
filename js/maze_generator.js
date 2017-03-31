// import { drawMaze, animate } from './animate_maze_build';
// import { buttonsListening } from './difficulty';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;
  // canvas.width = 900;
  // canvas.height = 450;

  const defaultDifficulty = 10;
  const game = new Game(defaultDifficulty);
  game.setUpGame();
});
