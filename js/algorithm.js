// Allow the maze to be customized via size parameters
const createGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(0);
  }
  return grid;
};

// Set up constants to aid with describing the passage directions
const [n, s, e, w] = ['n', 's', 'e', 'w'];
const dx = { e: 1, w: -1, n: 0, s: 0 };
const dy = { e: 0, w: 0, n: -1, s: 1 };
const opposite = { e: w, w: e, n: s, s: n };

// Implementation of the Fisher-Yates Shuffle for randomized directions
const shuffle = array => {
  const shuffled = array.slice();
  let currentIndex = shuffled.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled;
};

// The recursive backtracking algorithm
const carvePassagesFrom = (cx, cy, grid) => {
  const directions = shuffle(['n', 's', 'e', 'w']);
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

      carvePassagesFrom(nx, ny, grid);
    }
  });
};

// Create the maze and return it, according to size params
const createMaze = size => {
  const grid = createGrid(size, size);
  carvePassagesFrom(0, 0, grid);
  return grid;
};

export default createMaze;
