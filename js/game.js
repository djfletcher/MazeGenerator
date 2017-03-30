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
    const r = 70;
    this.player = new Player(x, y, r, this.ctx);

    this.bindKeys();
  }

  setUpGame(difficulty) {
    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // const maze = new Maze(difficulty, ctx);
    this.maze.createMaze();
    this.maze.mapCellsToWalls();
    this.draw();
  }

  draw(e, handler) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // need to refactor drawMaze and mapCellsToWalls to be class methods of Maze
    this.maze.drawMaze();
    if (e) {
      this.player.moveCircle(e, handler);
    }
    this.player.drawCircle();
  }

  bindKeys() {
    window.key('up', this.draw.bind(this));
    window.key('down', this.draw.bind(this));
    window.key('left', this.draw.bind(this));
    window.key('right', this.draw.bind(this));
  }
}

export default Game;
