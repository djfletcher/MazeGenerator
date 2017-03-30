class Circle {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;

    this.movements = {
      up: { dx: 0, dy: -5 },
      down: { dx: 0, dy: 5 },
      left: { dx: -5, dy: 0 },
      right: { dx: 5, dy: 0 }
    };

    // this.bindKeys();
    this.moveCircle = this.moveCircle.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
  }
  //
  // bindKeys() {
  //   window.key('up', this.moveCircle.bind(this));
  //   window.key('down', this.moveCircle.bind(this));
  //   window.key('left', this.moveCircle.bind(this));
  //   window.key('right', this.moveCircle.bind(this));
  // }

  moveCircle(e, handler) {
    // debugger;
    const movement = this.movements[handler.shortcut];
    this.x = this.x + movement.dx;
    this.y = this.y + movement.dy;
    // this.drawCircle();
  }

  drawCircle() {
    const [x, y, r, ctx] = [this.x, this.y, this.r, this.ctx];
    // debugger;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
}

export default Circle;
