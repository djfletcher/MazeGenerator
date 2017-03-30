import Player from './player_new';
import Maze from './maze_new';

class Game {
  constructor(difficulty) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = this.canvas.height / difficulty;

    this.maze = new Maze(difficulty, this.ctx);

    const r = (this.cellSize - 2) / 2;
    const x = r + 1;
    const y = r + 1;
    this.player = new Player(x, y, r, this.ctx);

    this.bindKeys();
  }

  setUpGame(difficulty) {
    this.maze.createMaze();
    this.finishLine = this.maze.finishLine;
    this.player.mazeWalls = this.maze.mapCellsToWalls();
    this.draw();
  }

  draw(e, handler) {
    if (e) { this.player.moveCircle(e, handler); }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.maze.drawMaze();
    this.player.drawCircle();
    if (this.won()) {
      this.unbindKeys();
      window.alert("YOU WON!");
    }
  }

  won() {
    return (this.player.row === this.maze.finishLine.row &&
            this.player.col === this.maze.finishLine.col);
  }

  bindKeys() {
    window.key('up, down, left, right', this.draw.bind(this));
  }

  unbindKeys() {
    window.key.unbind('up, down, left, right');
  }
}

export default Game;
