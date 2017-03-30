import { drawMaze, mapCellsToWalls } from './draw_maze';

class Game {
  constructor(maze, player, ctx) {
    this.ctx = ctx;
    this.maze = mapCellsToWalls(maze.grid);
    this.player = player;

    this.bindKeys();
  }

  draw(e, handler) {
    // debugger;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // need to refactor drawMaze and mapCellsToWalls to be class methods of Maze
    drawMaze(this.maze, this.ctx);
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
