class Player {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;

    const speed = r / 2;
    this.movements = {
      up: { dx: 0, dy: -speed },
      down: { dx: 0, dy: speed },
      left: { dx: -speed, dy: 0 },
      right: { dx: speed, dy: 0 }
    };

    // for smoother animation and movement, see below
    // http://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls

    this.moveCircle = this.moveCircle.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
  }

  moveCircle(e, handler) {
    const movement = this.movements[handler.shortcut];
    if (this.validNextMove(movement)) {
      this.x = this.x + movement.dx;
      this.y = this.y + movement.dy;
    }
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

  validNextMove(movement) {

    // Flag to put variables back if we hit an edge of the board.
    let valid = true;

    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    const next = {
      north: this.y + movement.dy - this.r,
      south: this.y + movement.dy + this.r,
      west: this.x + movement.dx - this.r,
      east: this.x + movement.dx + this.r
    };

    // if next move will be off board
    if (next.north < 0 || next.south > height) { valid = false; }
    if (next.west < 0 || next.east > width) { valid = false; }

    return valid;
    // collideTest();
  }

}

export default Player;
