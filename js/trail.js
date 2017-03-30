class Trail {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.path = [{ x, y }];
  }

  drag(x, y) {
    this.path.push({ x, y });
  }

  drawTail() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.path.forEach(point => {
      this.ctx.lineTo(point.x, point.y);
    });
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
  }

}

export default Trail;
