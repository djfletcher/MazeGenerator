class Player {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;

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
  }

  drawCircle() {
    const [x, y, r, ctx] = [this.x, this.y, this.r, this.ctx];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  moveCircle(e, handler) {
    const movement = this.movements[handler.shortcut];
    if (this.validNextMove(movement)) {
      this.x = this.x + movement.dx;
      this.y = this.y + movement.dy;
      this.row = this.row + movement.dRow;
      this.col = this.col + movement.dCol;
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
