import Trail from './trail';

class Player {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;
    this.trail = new Trail(x, y, ctx);

    this.row = 0;
    this.col = 0;

    this.mazeWalls = undefined;

    this.movements = {
      up: { dx: 0, dy: 2 * (-r - 1), dRow: -1, dCol: 0, dir: 'n' },
      down: { dx: 0, dy: 2 * (r + 1), dRow: 1, dCol: 0, dir: 's' },
      left: { dx: 2 * (-r - 1), dy: 0, dRow: 0, dCol: -1, dir: 'w' },
      right: { dx: 2 * (r + 1), dy: 0, dRow: 0, dCol: 1, dir: 'e' }
    };

    this.moveCircle = this.moveCircle.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
    this.animateMove = this.animateMove.bind(this);
  }

  drawCircle() {
    const [x, y, r, ctx] = [this.x, this.y, this.r, this.ctx];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgb(171, 70, 67)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(65, 67, 82)';
    ctx.stroke();
  }

  moveCircle(e, handler) {
    const movement = this.movements[handler.shortcut];
    if (this.validNextMove(movement)) {
      this.x = this.x + movement.dx;
      this.y = this.y + movement.dy;
      this.row = this.row + movement.dRow;
      this.col = this.col + movement.dCol;

      this.trail.drag(this.x, this.y);
    }
  }

  animateMove(nx, ny, dx, dy) {
    let x = 0;
    let y = 0;
    //move by one pixel per frame in the appropriate dx or dy direction
    if (dx !== 0) { x = dx < 0 ? -1 : 1; }
    if (dy !== 0) { y = dy < 0 ? -1 : 1; }

    if (Math.abs(nx - this.x) > 0 || Math.abs(ny - this.y) > 0) {
      this.x = this.x + x;
      this.y = this.y + y;
      this.drawCircle();
      window.requestAnimationFrame(() => this.animateMove(nx, ny, dx, dy));
    }
  }

  validNextMove(movement) {
    const next = {
      row: this.row + movement.dRow,
      col: this.col + movement.dCol
    };

    return this.onCanvas(next) && this.noCollision(movement.dir);
  }

  onCanvas(next) {
    return (0 <= next.row && next.row < this.mazeWalls.length &&
            0 <= next.col && next.col < this.mazeWalls.length);
  }

  noCollision(dir) {
    return this.mazeWalls[this.row][this.col].indexOf(dir) < 0;
  }
}

export default Player;
