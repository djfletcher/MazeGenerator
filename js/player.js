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
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
  }

  validNextMove(movement) {
    const next = {
      north: this.y + movement.dy - this.r,
      south: this.y + movement.dy + this.r,
      west: this.x + movement.dx - this.r,
      east: this.x + movement.dx + this.r
    };

    // return this.onCanvas(next) && this.noCollision(next);
    return this.onCanvas(next);
  }

  onCanvas(next) {
    let valid = true;

    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;

    // if next move will be off board
    if (next.north < 0 || next.south > height) { valid = false; }
    if (next.west < 0 || next.east > width) { valid = false; }

    return valid;
  }

  // noCollision(next) {
  //   let valid = true;
  //   const breadth = this.r * 2;
  //   const imgData = this.ctx.getImageData(next.west, next.north, breadth, breadth);
  //   // debugger;
  //   for (let i = 0; i < imgData.data.length; i++) {
  //     if (imgData.data[i] == 0) {
  //       valid = false;
  //       alert("black!");
  //       break;
  //     }
  //   }
  //
  //   return valid;
  // }
}

export default Player;
