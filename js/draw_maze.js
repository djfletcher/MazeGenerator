export const drawGrid = (width, height, ctx) => {
    for (let x = 0; x <= width; x += 50) {
      // if (grid[])
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    for (let x = 0; x <= height; x += 50) {
      ctx.moveTo(0, x);
      ctx.lineTo(width, x);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
};

export const getCoordinates = grid => {
  const coords = { x: 0, y: 0 };
  const vertices = [[0, 0]];

  grid.forEach(row => {
    row.forEach(square => {
      switch(square) {
        case 'n':
          coords.y -= 100;
          vertices.push([coords.x, coords.y]);
        case 's':
          coords.y += 100;
          vertices.push([coords.x, coords.y]);
        case 'w':
          coords.x -= 100;
          vertices.push([coords.x, coords.y]);
        case 'e':
          coords.x += 100;
          vertices.push([coords.x, coords.y]);
      }
    });
  });

  return vertices;
};

export const locateCells = (grid, ctx) => {
  const cellSize = 50;
  const offset = cellSize / 2;
  let xStart, yStart;
  let xEnd, yEnd;

  ctx.beginPath();

  grid.forEach((row, rowIdx) => {
    row.forEach((square, colIdx) => {
      xStart = cellSize * colIdx + offset;
      yStart = cellSize * rowIdx + offset;

      switch(square) {
        case 'n':
          yStart -= 25;
          xStart -= 25;

          yEnd = yStart;
          xEnd = xStart + 50;
        case 's':
          yStart += 25;
          xStart -= 25;

          yEnd = yStart;
          xEnd = xStart + 50;
        case 'w':
          xStart -= 25;
          yStart -= 25;

          xEnd = xStart;
          yEnd = yStart + 50;
        case 'e':
          xStart += 25;
          yStart -= 25;

          xEnd = xStart;
          yEnd = yStart + 50;
      }
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
    });
  });
  ctx.strokeStyle = "white";
  ctx.stroke();
};

export const eraseWall = (cell, wall, ctx) => {

};

export const drawMaze = (ctx, vertices) => {
  ctx.moveTo(...(vertices[0]));
  ctx.beginPath();
  vertices.forEach(vertex => ctx.lineTo(...vertex));
  ctx.stroke();
};

const opposites = { e: 'w', w: 'e', n: 's', s: 'n' };
const directions = ['n', 's', 'w', 'e'];

export const mapCellsToWalls = grid => {
  const newGrid = [];
  const inBounds = (row, col) => (
    0 <= row && row < grid.length &&
      0 <= col && col < grid[row].length
  );

  grid.forEach((row, rowIdx) => {
    let newRow = [];
    row.map((cell, colIdx) => {
      let paths = [cell];
      // debugger;
      if (inBounds(rowIdx - 1, colIdx) &&
          grid[rowIdx - 1][colIdx] === 's') { paths.push('n'); }
      if (inBounds(rowIdx + 1, colIdx) &&
          grid[rowIdx + 1][colIdx] === 'n') { paths.push('s'); }
      if (inBounds(rowIdx, colIdx - 1) &&
          grid[rowIdx][colIdx - 1] === 'e') { paths.push('w'); }
      if (inBounds(rowIdx, colIdx + 1) &&
          grid[rowIdx][colIdx + 1] === 'w') { paths.push('e'); }
      let walls = directions.filter(d => !paths.includes(d));
      // debugger;
      newRow.push(walls);
    });
    newGrid.push(newRow);
  });
  // console.log(grid);
  return newGrid;
};
