export const drawMaze = (grid, ctx) => {
  const cellSize = ctx.canvas.height / grid.length;
  let xStart, yStart;
  let xEnd, yEnd;

  ctx.beginPath();

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
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
      });
    });
  });
  ctx.strokeStyle = "black";
  ctx.stroke();
};

export const mapCellsToWalls = grid => {
  const directions = ['n', 's', 'w', 'e'];
  const newGrid = [];
  const inBounds = (row, col) => (
    0 <= row && row < grid.length &&
      0 <= col && col < grid[row].length
  );

  grid.forEach((row, rowIdx) => {
    let newRow = [];
    row.map((cell, colIdx) => {
      let paths = [cell];

      if (inBounds(rowIdx - 1, colIdx) &&
          grid[rowIdx - 1][colIdx] === 's') { paths.push('n'); }
      if (inBounds(rowIdx + 1, colIdx) &&
          grid[rowIdx + 1][colIdx] === 'n') { paths.push('s'); }
      if (inBounds(rowIdx, colIdx - 1) &&
          grid[rowIdx][colIdx - 1] === 'e') { paths.push('w'); }
      if (inBounds(rowIdx, colIdx + 1) &&
          grid[rowIdx][colIdx + 1] === 'w') { paths.push('e'); }

      let walls = directions.filter(d => !paths.includes(d));
      newRow.push(walls);
    });
    newGrid.push(newRow);
  });

  return newGrid;
};
