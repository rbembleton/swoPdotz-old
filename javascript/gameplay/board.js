const Dots = require('../dots/all_dots');
const Colors = require('../constants/colors');
const Shapes = require('../constants/shapes');


let Board = function (options) {
  this.size = options.size || 16;
  this.grid = initializeGrid(this.size);
  this.isKilled = false;
  this.score = 0;
  this.colors = levelColors(options.colors || [0,1,2,3,4,5,6,7,8]);
  this.dotIdentifier = 0;
  this.dotsById = {};
  this.style = ' ';
  this.explosionCallbacks = options.callbacks || {};
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
  6: Dots.asterisk
};

function levelColors(array) {
  const colorKeys = Object.keys(Colors);
  let myColors = [];

  array.forEach((el) => {
    myColors.push(Colors[colorKeys[el]]);
  });

  return myColors;
}

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

Board.prototype.placeRandomDot = function (x, y) {
  // let randColor = Object.keys(Colors)[Math.floor(Math.random() * 8)];
  let randColor = this.colors[Math.floor(Math.random() * this.colors.length)];

  const newDot = (new Dots.circle({
    color: randColor,
    pos: [x, y],
    id: this.dotIdentifier
  }));

  this.grid[x][y] = newDot;
  this.dotsById[this.dotIdentifier] = newDot;
  this.dotIdentifier++;
};

Board.prototype.placeDots = function () {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {
      this.placeRandomDot(ix, iy);
    }
  }
};

Board.prototype.fillInTop = function () {
  let noFills = true;

  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {
      if ( !this.grid[ix][iy] ) {

        this.placeRandomDot(ix, iy);
        noFills = false;
      }
    }
  }

  return noFills;
};

Board.prototype.getValAt = function (pos) {
  return this.grid[pos[0]][pos[1]];
};

Board.prototype.setValAt = function (pos, val) {
  this.grid[pos[0]][pos[1]] = val;
};

Board.prototype.checkInARows = function (callback, update) {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {

      this.checkClusters(ix, iy);
      this.checkNumInDelta(ix, iy, 6, [0, 1], update);
      this.checkNumInDelta(ix, iy, 6, [1, 0], update);
      this.checkNumInDelta(ix, iy, 5, [0, 1], update);
      this.checkNumInDelta(ix, iy, 5, [1, 0], update);
      this.checkNumInDelta(ix, iy, 4, [0, 1], update);
      this.checkNumInDelta(ix, iy, 4, [1, 0], update);
      this.checkNumInDelta(ix, iy, 3, [0, 1], update);
      this.checkNumInDelta(ix, iy, 3, [1, 0], update);

    }
  }

  callback();

};

Board.prototype.killColor = function (color) {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {

      if (this.grid[ix][iy] && this.grid[ix][iy].color === color) {
        this.removeDot(ix, iy);
      }

    }
  }
};

Board.prototype.changeColors = function (color) {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {

      if (this.grid[ix][iy]) {
        this.grid[ix][iy].color = color;
      }

    }
  }
};

Board.prototype.killCross = function (x, y) {
  for (var ix = 0; ix < this.size; ix++) {
    if (this.grid[ix][y]) {
      this.removeDot(ix, y);
    }
  }
  for (var iy = 0; iy < this.size; iy++) {
    if (this.grid[x][iy]) {
      this.removeDot(x, iy);
    }
  }
};

Board.prototype.killTri = function (x, y) {
  if (y < (this.size - 1) && this.grid[x][y + 1]) {
    this.removeDot(x, y + 1);
  }
  if (x > 0 && y > 0 && this.grid[x - 1][y - 1]) {
    this.removeDot(x - 1, y - 1);
  }
  if (x < (this.size - 1) && y > 0 && this.grid[x + 1][y - 1]) {
    this.removeDot(x + 1, y - 1);
  }
};

Board.prototype.killSquare = function (x, y) {
  for (var ix = x - 2; ix < x + 3; ix++) {
    for (var iy = y - 2; iy < y + 3; iy++) {
      if (ix >= 0 && iy >= 0 && ix < this.size && iy < this.size && this.grid[ix][iy]) {
        this.removeDot(ix, iy);
      }
    }
  }
};

Board.prototype.removeDot = function (x, y) {
  if (this.grid[x][y] === null) { return; }
  let oldDot = this.grid[x][y];

  oldDot.isKilled = true;
  this.grid[x][y] = null;

  if (oldDot instanceof Dots.star) {
    this.explosionCallbacks.star();
    this.killColor(oldDot.color);
  } else if (oldDot instanceof Dots.square) {
    this.explosionCallbacks.square();
    this.killCross(x, y);
  } else if (oldDot instanceof Dots.triangle) {
    this.explosionCallbacks.triangle();
    this.killTri(x, y);
  } else if (oldDot instanceof Dots.heart) {
    this.explosionCallbacks.heart();
    this.killSquare(x, y);
  } else if (oldDot instanceof Dots.asterisk) {
    this.explosionCallbacks.asterisk();
    this.changeColors(oldDot.color);
  }

};

Board.prototype.replaceDot = function (x, y, dotConstructor) {
  if (this.grid[x][y] === null) { return; }
  const oldDot = this.grid[x][y];
  this.removeDot(x, y);

  this.grid[x][y] = new dotConstructor({
    color: oldDot.color,
    pos: oldDot.pos,
    id: this.dotIdentifier
  });
  this.dotsById[this.dotIdentifier] = this.grid[x][y];
  this.dotIdentifier ++;
};

Board.prototype.checkClusters = function (x, y) {
  if (!this.grid[x][y] || (x === this.size - 1) || (y === this.size - 1) ||
    !this.grid[x + 1][y] ||
    !this.grid[x][y + 1] ||
    !this.grid[x + 1][y + 1]) { return; }

  const thisColor = this.grid[x][y].color;
  if ((this.grid[x + 1][y].color === thisColor) &&
      (this.grid[x + 1][y + 1].color === thisColor) &&
      (this.grid[x][y + 1].color === thisColor)) {

    this.removeDot(x, y + 1);
    this.removeDot(x + 1, y);
    this.removeDot(x + 1, y + 1);
    this.replaceDot(x, y, Dots.heart);

    this.score += scoreConv[4];
  }

};


Board.prototype.checkNumInDelta = function (x, y, num, dPos, callback) {
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
          this.replaceDot(x + dx * j, y + dy * j, dotNumConv[num]);
        } else {
          this.removeDot(x + dx * j, y + dy * j);
        }
      }
      this.score += scoreConv[num];
      // callback();
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
