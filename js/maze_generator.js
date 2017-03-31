import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;

  const defaultDifficulty = 10;
  const game = new Game(defaultDifficulty);
  game.setUpGame();
});
