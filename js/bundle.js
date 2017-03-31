/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maze__ = __webpack_require__(1);


// import { changeDifficulty } from './difficulty';

// NEXT --> if you pass a branching point have the trail leave a node there,
// just a fatter point that sticks out of the line, and you can hit space to
// return to your last node.

class Game {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.difficultyButtonsActive();
    // this.maze = new Maze(difficulty, this.ctx);

    // const r = (this.cellSize - 2) / 2;
    // const x = r + 1;
    // const y = r + 1;
    // this.player = new Player(x, y, r, this.ctx);
    this.setUpGame = this.setUpGame.bind(this);
  }

  setUpGame(difficulty) {
    this.unbindKeys();
    this.difficulty = difficulty || this.difficulty;
    this.cellSize = this.canvas.height / this.difficulty;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.maze = new __WEBPACK_IMPORTED_MODULE_1__maze__["a" /* default */](this.difficulty, this.ctx);
    this.maze.createMaze();
    this.finishLine = this.maze.finishLine;

    const r = (this.cellSize - 2) / 2;
    const x = r + 1;
    const y = r + 1;
    this.player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */](x, y, r, this.ctx);
    this.player.mazeWalls = this.maze.mapCellsToWalls();

    this.maze.animateMazeBuild(0, this.draw.bind(this), this.bindKeys.bind(this));
    // this.draw();
    // this.bindKeys();
  }

  draw(e, handler) {
    if (e) { this.player.moveCircle(e, handler); }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.maze.drawMaze();
    this.player.drawCircle();
    this.player.trail.drawTrail();
    if (this.won()) {
      this.unbindKeys();
      window.setTimeout(this.setUpGame, 1000);
    }
    // debugger;
    // this.bindKeys();
  }

  won() {
    return (this.player.row === this.maze.finishLine.row &&
            this.player.col === this.maze.finishLine.col);
  }

  bindKeys() {
    // must unbind keys so they stop moving the player in previous games
    this.unbindKeys();
    window.key('up, down, left, right', this.draw.bind(this));
  }

  unbindKeys() {
    window.key.unbind('up, down, left, right');
  }

  difficultyButtonsActive() {
    const easy = document.getElementById("easy");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");
    const insane = document.getElementById("insane");

    easy.addEventListener("click", () => {
      this.setUpGame(5);
      // changeDifficulty(5);
    });

    medium.addEventListener("click", () => {
      this.setUpGame(10);
    });

    hard.addEventListener("click", () => {
      this.setUpGame(25);
    });

    insane.addEventListener("click", () => {
      // changeDifficulty(45);
      this.setUpGame(50);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Maze {
  constructor(difficulty, ctx) {
    this.difficulty = difficulty;
    this.cellSize = ctx.canvas.height / difficulty;

    this.ctx = ctx;
    this.grid = this.createGrid();

    this.finishLine = { row: this.grid.length - 1, col: this.grid.length - 1 };
    this.finishLineImg = new Image();
    this.finishLineImg.src = 'images/star.png';
    this.finishLineImgLoaded = this.finishLineImg.onload = this.drawFinishLine.bind(this);
    // this.finishLine = undefined;
    // this.spacesMoved = 0;
    this.orderBuilt = [];

    this.carvePassagesFrom = this.carvePassagesFrom.bind(this);
    this.animateMazeBuild = this.animateMazeBuild.bind(this);
    this.drawFinishLine = this.drawFinishLine.bind(this);
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
    this.carvePassagesFrom(Math.floor(this.difficulty / 2), Math.floor(this.difficulty / 2), this.grid);
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
        grid[cy][cx] = grid[cy][cx] || direction;
        grid[ny][nx] = grid[ny][nx] || opposite[direction];

        this.orderBuilt.push({ row: ny, col: nx });
        // this.finishLine = [ny, nx];
        this.carvePassagesFrom(nx, ny, grid);
        // this.spacesMoved++;
        // this.finishLine = [ny, nx];
        // if (this.spacesMoved === 100) { this.finishLine = [ny, nx]; }
      }
    });
    // this.finishLine = [cy, cx];
    // console.log(this.spacesMoved);
    // console.log(this.finishLine);
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
    return newGrid;
  }

  animateMazeBuild(i, drawRestOfCanvas, bindKeys) {
    // debugger;
    const indices = this.orderBuilt[i];
    const cellSize = this.cellSize;

    this.ctx.beginPath();
    this.wallsCollection[indices.row][indices.col].forEach(wall => {
      let xStart = cellSize * indices.col;
      let yStart = cellSize * indices.row;
      let xEnd, yEnd;

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

      this.ctx.moveTo(xStart, yStart);
      this.ctx.lineTo(xEnd, yEnd);
    });

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'rgb(65, 67, 82)';
    this.ctx.stroke();
    this.drawFinishLine();

    if (i < this.difficulty * this.difficulty - 2) {
      window.requestAnimationFrame(() => this.animateMazeBuild(i + 1, drawRestOfCanvas, bindKeys));
    } else {
      drawRestOfCanvas();
      bindKeys();
    }
  }

  // Draws the maze in canvas
  drawMaze() {
    const cellSize = this.cellSize;
    let xStart, yStart;
    let xEnd, yEnd;

    this.ctx.beginPath();

    this.wallsCollection.forEach((row, rowIdx) => {
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

          this.ctx.moveTo(xStart, yStart);
          this.ctx.lineTo(xEnd, yEnd);
        });
      });
    });
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'rgb(65, 67, 82)';
    this.ctx.stroke();
    this.drawFinishLine();
  }

  drawFinishLine() {
    // star.crossOrigin = 'anonymous';
    // debugger;
    this.ctx.drawImage(
      this.finishLineImg,
      this.finishLine.col * this.cellSize,
      this.finishLine.row * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Maze);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
// import { drawMaze, animate } from './animate_maze_build';
// import { buttonsListening } from './difficulty';


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;
  // canvas.width = 900;
  // canvas.height = 450;

  const defaultDifficulty = 10;
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](defaultDifficulty);
  game.setUpGame();
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__trail__ = __webpack_require__(4);


class Player {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;
    this.trail = new __WEBPACK_IMPORTED_MODULE_0__trail__["a" /* default */](x, y, ctx);

    this.row = 0;
    this.col = 0;

    this.mazeWalls = undefined;

    this.movements = {
      up: { dx: 0, dy: 2 * (-r - 1), dRow: -1, dCol: 0, dir: 'n' },
      down: { dx: 0, dy: 2 * (r + 1), dRow: 1, dCol: 0, dir: 's' },
      left: { dx: 2 * (-r - 1), dy: 0, dRow: 0, dCol: -1, dir: 'w' },
      right: { dx: 2 * (r + 1), dy: 0, dRow: 0, dCol: 1, dir: 'e' }
    };

    this.moveCircle = this.moveCircle.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
    this.animateMove = this.animateMove.bind(this);
  }

  drawCircle() {
    const [x, y, r, ctx] = [this.x, this.y, this.r, this.ctx];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgb(171, 70, 67)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(65, 67, 82)';
    ctx.stroke();
  }

  moveCircle(e, handler) {
    const movement = this.movements[handler.shortcut];
    if (this.validNextMove(movement)) {
      // const nx = this.x + movement.dx;
      // const ny = this.y + movement.dy;

      // this.animateMove(nx, ny, movement.dx, movement.dy);

      this.x = this.x + movement.dx;
      this.y = this.y + movement.dy;
      this.row = this.row + movement.dRow;
      this.col = this.col + movement.dCol;

      this.trail.drag(this.x, this.y);
    }
  }

  animateMove(nx, ny, dx, dy) {
    let x = 0;
    let y = 0;
    //move by one pixel per frame in the appropriate dx or dy direction
    if (dx !== 0) { x = dx < 0 ? -1 : 1; }
    if (dy !== 0) { y = dy < 0 ? -1 : 1; }
    // let x = dx < 0 ? -1 : 1;
    // let y = dy < 0 ? -1 : 1;

    if (Math.abs(nx - this.x) > 0 || Math.abs(ny - this.y) > 0) {
      this.x = this.x + x;
      this.y = this.y + y;
      this.drawCircle();
      window.requestAnimationFrame(() => this.animateMove(nx, ny, dx, dy));
    }
  }

  validNextMove(movement) {
    const next = {
      row: this.row + movement.dRow,
      col: this.col + movement.dCol
    };

    return this.onCanvas(next) && this.noCollision(movement.dir);
  }

  onCanvas(next) {
    return (0 <= next.row && next.row < this.mazeWalls.length &&
            0 <= next.col && next.col < this.mazeWalls.length);
  }

  noCollision(dir) {
    return this.mazeWalls[this.row][this.col].indexOf(dir) < 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Trail {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.path = [{ x, y }];
  }

  drag(x, y) {
    this.path.push({ x, y });
  }

  drawTrail() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.path.forEach(point => {
      this.ctx.lineTo(point.x, point.y);
    });
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'rgb(171, 70, 67)';
    this.ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Trail);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map