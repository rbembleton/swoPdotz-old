const Dots = require('../dots/all_dots');

let Board = function (options) {
  this.size = 16;
  this.grid = initializeGrid(this.size);
  this.isKilled = false;
  this.score = 0;
  this.dotIdentifier = 0;
  this.dotsById = {};
  this.style = ' ';
};

const scoreConv = {
  3: 50,
  4: 200,
  5: 500,
  6: 1000
};

const dotNumConv = {
  3: Dots.triangle,
  4: Dots.square,
  5: Dots.star,
  6: Dots.heart
};

function initializeGrid(size) {
  let newGrid = {};

  for (var ix = 0; ix < size; ix++) {
    newGrid[ix] = {};
    for (var iy = 0; iy < size; iy++) {
      newGrid[ix][iy] = {};
    }
  }

  return newGrid;
}

Board.prototype.getValAt = function (pos) {
  return this.grid[pos[0]][pos[1]];
};

Board.prototype.setValAt = function (pos, val) {
  this.grid[pos[0]][pos[1]] = val;
};

Board.prototype.checkInARows = function (callback) {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {

      this.checkNumInDelta(ix, iy, 6, [0, 1]);
      this.checkNumInDelta(ix, iy, 6, [1, 0]);
      this.checkNumInDelta(ix, iy, 5, [0, 1]);
      this.checkNumInDelta(ix, iy, 5, [1, 0]);
      this.checkNumInDelta(ix, iy, 4, [0, 1]);
      this.checkNumInDelta(ix, iy, 4, [1, 0]);
      this.checkNumInDelta(ix, iy, 3, [0, 1]);
      this.checkNumInDelta(ix, iy, 3, [1, 0]);

    }
  }

  callback();

};


Board.prototype.checkNumInDelta = function (x, y, num, dPos) {
  const dx = dPos[0];
  const dy = dPos[1];
  const size = this.size;

  if (this.grid[x][y] && this.grid[x][y].id && (x + ((num - 1) * dx) < size) && (y + ((num - 1) * dy) < size)) {
    const initColor = this.grid[x][y].color;
    let sameColor = true;

    for (var i = 0; i < num && sameColor; i++) {
      if (!this.grid[x + dx * i][y + dy * i] ||
        this.grid[x + dx * i][y + dy * i].color !== initColor) {
        sameColor = false;
      }
    }

    if (sameColor === true && i === num) {
      for (var j = 0; j < num; j++) {
        if (Math.floor(num / 2) === j) {
          let oldDot = this.grid[x + dx * j][y + dy * j];
          oldDot.isKilled = true;
          this.grid[x + dx * j][y + dy * j] = new dotNumConv[num]({
            color: oldDot.color,
            pos: oldDot.pos,
            id: this.dotIdentifier
          });
          this.dotsById[this.dotIdentifier] = this.grid[x + dx * j][y + dy * j];
          this.dotIdentifier ++;
        } else {
          this.grid[x + dx * j][y + dy * j].isKilled = true;
          this.grid[x + dx * j][y + dy * j] = null;
        }
      }
      this.score += scoreConv[num];

    }
  }
};


Board.prototype.shiftColumnDown = function (x, startY) {
  let nextToBeFilled = startY;

  for (var y = startY; y < this.size; y++) {
    if (this.grid[x][y]) {
      this.grid[x][y].pos = [x, nextToBeFilled];
      this.grid[x][nextToBeFilled] = this.grid[x][y];
      this.grid[x][nextToBeFilled].style = 'drop';
      this.grid[x][nextToBeFilled].oldPos = [x, y];
      this.grid[x][y] = null;

      nextToBeFilled ++;
    }
  }
};



Board.prototype.columnsDrop = function (callback) {
  let columnsDropped = false;

  for (var ix = 0; ix < this.size; ix++) {
    let thisColumnDropped = false;

    for (var iy = 0; (iy < this.size && !thisColumnDropped); iy++) {

      if (!this.grid[ix][iy]) {
        thisColumnDropped = true;
        columnsDropped = true;
        this.shiftColumnDown(ix, iy);
      }

    }
  }

  callback();
  
};

module.exports = Board;
