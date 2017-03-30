class Player {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;

    this.currentRow = 0;
    this.currentCol = 0;

    this.mazeWalls = undefined;

    this.movements = {
      up: { dx: 0, dy: 2 * (-r - 1), dRow: -1, dCol: 0, dir: 'n' },
      down: { dx: 0, dy: 2 * (r + 1), dRow: 1, dCol: 0, dir: 's' },
      left: { dx: 2 * (-r - 1), dy: 0, dRow: 0, dCol: -1, dir: 'w' },
      right: { dx: 2 * (r + 1), dy: 0, dRow: 0, dCol: 1, dir: 'e' }
    };

    // for smoother animation and movement, see below
    // http://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls

    this.moveCircle = this.moveCircle.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
  }

  // trackWalls(mazeWalls) {
  //   this.mazeWalls = mazeWalls;
  // }

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
      this.currentRow = this.currentRow + movement.dRow;
      this.currentCol = this.currentCol + movement.dCol;
    }
  }

  validNextMove(movement) {
    const next = {
      row: this.currentRow + movement.dRow,
      col: this.currentCol + movement.dCol
    };

    // debugger;
    // return true;
    return this.onCanvas(next) && this.noCollision(movement.dir);
    // return this.onCanvas(next);
  }

  onCanvas(next) {
    return (0 <= next.row && next.row < this.mazeWalls.length &&
            0 <= next.col && next.col < this.mazeWalls.length);
  }

  noCollision(dir) {
    // debugger;
    return this.mazeWalls[this.currentRow][this.currentCol].indexOf(dir) < 0;
  }
}

export default Player;
