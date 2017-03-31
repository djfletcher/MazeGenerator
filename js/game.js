import Player from './player';
import Maze from './maze';
// import { changeDifficulty } from './difficulty';

// NEXT --> if you pass a branching point have the trail leave a node there,
// just a fatter point that sticks out of the line, and you can hit space to
// return to your last node.

class Game {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.difficultyButtonsActive();
    // this.maze = new Maze(difficulty, this.ctx);

    // const r = (this.cellSize - 2) / 2;
    // const x = r + 1;
    // const y = r + 1;
    // this.player = new Player(x, y, r, this.ctx);
    this.setUpGame = this.setUpGame.bind(this);
  }

  setUpGame(difficulty) {
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

    this.maze.animateMazeBuild(0, this.draw.bind(this), this.bindKeys.bind(this));
    // this.draw();
    // this.bindKeys();
  }

  draw(e, handler) {
    if (e) { this.player.moveCircle(e, handler); }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.maze.drawMaze();
    this.player.drawCircle();
    this.player.trail.drawTrail();
    if (this.won()) {
      this.unbindKeys();
      window.setTimeout(this.setUpGame, 1000);
    }
    // debugger;
    // this.bindKeys();
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

  difficultyButtonsActive() {
    const easy = document.getElementById("easy");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");
    const insane = document.getElementById("insane");

    easy.addEventListener("click", () => {
      this.setUpGame(5);
      // changeDifficulty(5);
    });

    medium.addEventListener("click", () => {
      this.setUpGame(10);
    });

    hard.addEventListener("click", () => {
      this.setUpGame(25);
    });

    insane.addEventListener("click", () => {
      // changeDifficulty(45);
      this.setUpGame(50);
    });
  }
}

export default Game;
