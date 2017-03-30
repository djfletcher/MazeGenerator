class Maze {
  constructor(difficulty, ctx) {
    this.difficulty = difficulty;
    this.ctx = ctx;
    this.grid = this.createGrid();
    this.carvePassagesFrom = this.carvePassagesFrom.bind(this);

    this.wallPixelsSaved = false;
    this.wallPixels = Array(ctx.canvas.width + 1).fill(Array(ctx.canvas.height + 1));
  }

  // Allow the maze to be customized via size parameters
  createGrid() {
    const [rows, cols] = [this.difficulty, this.difficulty];
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols).fill(0);
    }
    return grid;
  }

  createMaze() {
    this.carvePassagesFrom(0, 0, this.grid);
  }

  // Implementation of the Fisher-Yates Shuffle for randomized directions
  shuffle(array) {
    const shuffled = array.slice();
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    return shuffled;
  }

  // The recursive backtracking algorithm
  carvePassagesFrom(cx, cy, grid) {
    // Set up constants to aid with describing the passage directions
    const [n, s, e, w] = ['n', 's', 'e', 'w'];
    const dx = { e: 1, w: -1, n: 0, s: 0 };
    const dy = { e: 0, w: 0, n: -1, s: 1 };
    const opposite = { e: w, w: e, n: s, s: n };

    const directions = this.shuffle(['n', 's', 'e', 'w']);
    let nx, ny;

    const valid = (col, row) => (
      0 <= row && row < grid.length &&
        0 <= col && col < grid[row].length &&
        grid[row][col] === 0
    );

    directions.forEach(direction => {
      nx = cx + dx[direction];
      ny = cy + dy[direction];

      if (valid(nx, ny)) {
        // grid[cy][cx] = grid[cy][cx] || direction;
        if (cx === 0 && cy === 0) { grid[cy][cx] = 'w'; }
        grid[ny][nx] = grid[ny][nx] || opposite[direction];

        this.carvePassagesFrom(nx, ny, grid);
      }
    });
  }

  // Maps each cell in the maze into an array indicating the walls
  // that should be drawn around it
  mapCellsToWalls() {
    const grid = this.grid;
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

    this.wallsCollection = newGrid;
  }

  // Draws the maze in canvas
  drawMaze() {
    const cellSize = this.ctx.canvas.height / this.grid.length;
    let xStart, yStart;
    let xEnd, yEnd;

    this.ctx.beginPath();

    this.wallsCollection.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        cell.forEach(wall => {
          let vertical;
          let horizontal;

          xStart = cellSize * colIdx;
          yStart = cellSize * rowIdx;

          switch(wall) {
            case 'n':
            yEnd = yStart;
            xEnd = xStart + cellSize;

            horizontal = true;
            // this.makeVirtualRepresentation({ xStart, xEnd });
            break;
            case 's':
            yStart += cellSize;

            yEnd = yStart;
            xEnd = xStart + cellSize;

            horizontal = true;
            break;
            case 'w':
            xEnd = xStart;
            yEnd = yStart + cellSize;

            vertical = true;
            break;
            case 'e':
            xStart += cellSize;

            xEnd = xStart;
            yEnd = yStart + cellSize;

            vertical = true;
            break;
          }

          // The first time through, save reference to pixels where walls are located
          if (!this.wallPixelsSaved) {
            if (vertical) {
              for (let y = yStart; y < yEnd; y++) {
                this.wallPixels[xStart][y] = true;
                // if (y < 0 || y >= this.wallPixels.length) { debugger; }
              }
            } else if (horizontal) {
              for (let x = xStart; x < xEnd; x++) {
                this.wallPixels[x][yStart] = true;
                // if (x < 0 || x >= this.wallPixels.length) { debugger; }
              }
            }
          }

          this.ctx.moveTo(xStart, yStart);
          this.ctx.lineTo(xEnd, yEnd);
        });
      });
    });
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.wallPixelsSaved = true;
  }
}

export default Maze;
