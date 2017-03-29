import { drawMaze, mapCellsToWalls } from './draw_maze';

class Game {
  constructor(maze, player, ctx) {
    this.ctx = ctx;
    this.maze = mapCellsToWalls(maze.grid);
    this.player = player;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // need to refactor drawMaze and mapCellsToWalls to be class methods of Maze
    drawMaze(this.maze, this.ctx);
    this.player.drawCircle();
  }
}

export default Game;
