import Player from './player';
import Maze from './maze';
// import { drawMaze, mapCellsToWalls } from './draw_maze';

class Game {
  constructor(difficulty) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.maze = new Maze(difficulty, this.ctx);

    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    const r = this.getPlayerSize(difficulty);
    this.player = new Player(x, y, r, this.ctx);

    this.bindKeys();
  }

  setUpGame(difficulty) {
    this.maze.createMaze();
    this.maze.mapCellsToWalls();
    this.draw();
  }

  draw(e, handler) {
    if (e) { this.player.moveCircle(e, handler); }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.maze.drawMaze();
    this.player.drawCircle();
  }

  getPlayerSize(difficulty) {
    switch(difficulty) {
      case 5:
        return 30;
      case 10:
        return 15;
      case 30:
        return 5;
      case 50:
        return 2;
    }
  }

  bindKeys() {
    window.key('up', this.draw.bind(this));
    window.key('down', this.draw.bind(this));
    window.key('left', this.draw.bind(this));
    window.key('right', this.draw.bind(this));
  }
}

export default Game;
