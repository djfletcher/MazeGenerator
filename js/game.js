import Player from './player';
import Maze from './maze';

// NEXT --> if you pass a branching point have the trail leave a node there,
// just a fatter point that sticks out of the line, and you can hit space to
// return to your last node.

class Game {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.easy = document.getElementById("easy");
    this.medium = document.getElementById("medium");
    this.hard = document.getElementById("hard");
    this.insane = document.getElementById("insane");

    this.setUpGame = this.setUpGame.bind(this);
  }

  setUpGame(difficulty) {
    this.disableDifficultyButtons();
    this.unbindKeys();
    this.difficulty = difficulty || this.difficulty;
    this.cellSize = this.canvas.height / this.difficulty;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.maze = new Maze(this.difficulty, this.ctx);
    this.maze.createMaze();
    this.finishLine = this.maze.finishLine;

    const r = (this.cellSize - 2) / 2;
    const x = r + 1;
    const y = r + 1;
    this.player = new Player(x, y, r, this.ctx);
    this.player.mazeWalls = this.maze.mapCellsToWalls();

    this.maze.animateMazeBuild(
      0,
      this.draw.bind(this),
      this.bindKeys.bind(this),
      this.activateDifficultyButtons.bind(this)
    );
  }

  draw(e, handler) {
    if (e) { this.player.moveCircle(e, handler); }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.maze.drawMaze();
    this.player.drawCircle();
    this.player.trail.drawTrail();
    if (this.won()) {
      this.unbindKeys();
      this.disableDifficultyButtons();
      window.setTimeout(this.setUpGame, 1000);
    }
  }

  won() {
    return (this.player.row === this.maze.finishLine.row &&
            this.player.col === this.maze.finishLine.col);
  }

  bindKeys() {
    // must unbind keys so they stop moving the player in previous games
    this.unbindKeys();
    window.key('up, down, left, right', this.draw.bind(this));
  }

  unbindKeys() {
    window.key.unbind('up, down, left, right');
  }

  activateDifficultyButtons() {
    this.easyListener = () => this.setUpGame(5);
    this.mediumListener = () => this.setUpGame(10);
    this.hardListener = () => this.setUpGame(25);
    this.insaneListener = () => this.setUpGame(50);

    this.easy.addEventListener("click", this.easyListener);
    this.medium.addEventListener("click", this.mediumListener);
    this.hard.addEventListener("click", this.hardListener);
    this.insane.addEventListener("click", this.insaneListener);

    this.easy.className = "";
    this.medium.className = "";
    this.hard.className = "";
    this.insane.className = "";
  }

  disableDifficultyButtons() {
    this.easy.removeEventListener("click", this.easyListener);
    this.medium.removeEventListener("click", this.mediumListener);
    this.hard.removeEventListener("click", this.hardListener);
    this.insane.removeEventListener("click", this.insaneListener);

    this.easy.className = "disabled";
    this.medium.className = "disabled";
    this.hard.className = "disabled";
    this.insane.className = "disabled";
  }
}

export default Game;
