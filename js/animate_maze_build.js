export const drawMaze = (grid, ctx) => {
  const cellSize = ctx.canvas.height / grid.length;
  let xStart, yStart;
  let xEnd, yEnd;

  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      cell.forEach(wall => {
        xStart = cellSize * colIdx;
        yStart = cellSize * rowIdx;

        switch(wall) {
          case 'n':
          yEnd = yStart;
          xEnd = xStart + cellSize;
          break;
          case 's':
          yStart += cellSize;

          yEnd = yStart;
          xEnd = xStart + cellSize;
          break;
          case 'w':
          xEnd = xStart;
          yEnd = yStart + cellSize;
          break;
          case 'e':
          xStart += cellSize;

          xEnd = xStart;
          yEnd = yStart + cellSize;
          break;
        }

        // divide the line into increments
        let points = [];
        for (let i = 0; i <= 20; i++) {
          points.push({
            x: xStart + i * (xEnd - xStart) / 20,
            y: yStart + i * (yEnd - yStart) / 20
          });
        }
        // debugger;
        animate(1, points, ctx);
      });
    });
  });
};

const animate = (t, points, ctx) => {
  if (t < points.length - 1) {
    requestAnimationFrame(() => animate(t + 1, points, ctx));
  }
  // draw a line segment from the last waypoint to the current waypoint
  ctx.beginPath();
  ctx.moveTo(points[t - 1].x, points[t - 1].y);
  ctx.lineTo(points[t].x, points[t].y);
  ctx.strokeStyle = "black";
  ctx.stroke();
};


// const points = [];

// export const drawMaze = (grid, ctx) => {
//   const cellSize = ctx.canvas.height / grid.length;
//   let xStart, yStart;
//   let xEnd, yEnd;
//
//   grid.forEach((row, rowIdx) => {
//     row.forEach((cell, colIdx) => {
//       cell.forEach(wall => {
//         xStart = cellSize * colIdx;
//         yStart = cellSize * rowIdx;
//
//         switch(wall) {
//           case 'n':
//           yEnd = yStart;
//           xEnd = xStart + cellSize;
//           break;
//           case 's':
//           yStart += cellSize;
//
//           yEnd = yStart;
//           xEnd = xStart + cellSize;
//           break;
//           case 'w':
//           xEnd = xStart;
//           yEnd = yStart + cellSize;
//           break;
//           case 'e':
//           xStart += cellSize;
//
//           xEnd = xStart;
//           yEnd = yStart + cellSize;
//           break;
//         }
//
//         // divide the line into increments
//         for (let i = 0; i < 20; i++) {
//           points.push({
//             x: xStart + (xEnd - xStart) / 20,
//             y: yStart + (yEnd - yStart) / 20
//           });
//         }
//
//       });
//     });
//   });
// };
//
// let t = 1;
// export const animate = ctx => {
//   if (t < points.length - 1) {
//     requestAnimationFrame(() => animate(ctx));
//   }
//   // draw a line segment from the last waypoint to the current waypoint
//   ctx.beginPath();
//   ctx.moveTo(points[t - 1].x, points[t - 1].y);
//   ctx.lineTo(points[t].x, points[t].y);
//   ctx.strokeStyle = "black";
//   ctx.stroke();
//   // increment "t" to get the next waypoint
//   t++;
// };


// const draw = (xStart, yStart, xEnd, yEnd, ctx) => {
//   ctx.beginPath();
//   ctx.moveTo(xStart, yStart);
//   ctx.lineTo(xEnd, yEnd);
//   ctx.strokeStyle = "black";
//   ctx.stroke();
// };
