class Player {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;

    this.currentRow = 0;
    this.currentCol = 0;

    this.movements = {
      up: { dx: 0, dy: 2 * (-r - 1), dRow: -1, dCol: 0 },
      down: { dx: 0, dy: 2 * (r + 1), dRow: 1, dCol: 0 },
      left: { dx: 2 * (-r - 1), dy: 0, dRow: -1, dCol: 0 },
      right: { dx: 2 * (r + 1), dy: 0, dRow: 1, dCol: 0 }
    };

    // for smoother animation and movement, see below
    // http://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls

    this.moveCircle = this.moveCircle.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
  }

  trackWalls(mazeWalls) {
    this.mazeWalls = mazeWalls;
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
    }
  }

  validNextMove(movement) {
    const next = {
      // row: ,
      // col:
    }

    return true;
    // return this.onCanvas(next) && this.noCollision(next);
    // return this.onCanvas(next);
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

  // noCollision(next, direction) {
  //   let pixelProbe = { x: this.x, y: this.y };
  //
  //   switch(direction) {
  //     case 'up':
  //       pixelProbe.y = next.north;
  //       break;
  //     case 'down':
  //       pixelProbe.y = next.south;
  //       break;
  //     case 'right':
  //       pixelProbe.x = next.east;
  //       break;
  //     case 'left':
  //       pixelProbe.x = next.west;
  //       break;
  //   }
  //
  //   const dist = (p1, p2) => {
  //     const dx = p2.x - p1.x;
  //     const dy = p2.y - p1.y;
  //     return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  //   };
  //
  //   const collision = wallMidpoint => {
  //     return dist(wallMidpoint, pixelProbe) < this.r;
  //   };
  //
  //   return this.wallmidpoints.some(collision);
  // }

  noCollision(next) {
    let valid = true;
    const breadth = this.r * 2;
    const imgData = this.ctx.getImageData(next.west, next.north, breadth, breadth);
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i + 2] === 255) {
        // debugger;
        valid = false;
        alert("blue!");
        break;
      }
    }

    return valid;
  }
}

export default Player;
