const Dots = require('../dots/all_dots');
const Colors = require('../constants/colors');
const Shapes = require('../constants/shapes');


let Board = function (options) {
  this.size = options.size || 16;
  this.grid = initializeGrid(this.size, {});
  this.score = 0;
  this.colors = levelColors(options.colors || [0,1,2,3,4,5,6,7,8]);
  this.style = ' ';

  this.dotIdentifier = 0;
  this.dotsById = {};

  this.dotsToExplode = initializeGrid(this.size, false);
  this.explodedSpaces = initializeGrid(this.size, ' ');
  this.explosionCallbacks = options.callbacks || {};
  this.scoreMultiplier = 0;
  this.fruitify = options.fruitify === true ? true : false;
  this.spheresToExplode = [];
};

const scoreConv = {
  3: 51,
  4: 201,
  5: 501,
  6: 1001
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

function initializeGrid(size, placeholder) {
  let newGrid = {};

  for (var ix = 0; ix < size; ix++) {
    newGrid[ix] = {};
    for (var iy = 0; iy < size; iy++) {
      newGrid[ix][iy] = placeholder;
    }
  }

  return newGrid;
}

Board.prototype.verifyValidPositions = function (...positions) {
  const that = this;
  return positions.every((pos) => {
    return (
      pos[0] >= 0 && pos[1] >= 0 &&
      pos[0] < that.size && pos[1] < that.size &&
      that.grid[pos[0]][pos[1]] &&
      !that.dotsToExplode[pos[0]][pos[1]]
    );
  });
};

Board.prototype.verifyColors = function (color, ...positions) {
  const that = this;
  return positions.every((pos) => {
    return (
      pos[0] >= 0 && pos[1] >= 0 &&
      pos[0] < that.size && pos[1] < that.size &&
      that.grid[pos[0]][pos[1]] &&
      !that.dotsToExplode[pos[0]][pos[1]] &&
      that.grid[pos[0]][pos[1]].color === color
    );
  });
};


Board.prototype.blowEmUp = function (callback) {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {
      if (this.dotsToExplode[ix][iy] ) this.removeDot(ix, iy);
    }
  }

  this.dotsToExplode = initializeGrid(this.size, false);
  callback();
};

Board.prototype.rainbowTiles = function () {
  const ret_arr = [];
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {
      if (this.grid[ix][iy].color === 'rainbow') { ret_arr.push([ix, iy]); }
    }
  }
  return ret_arr;
};

const rainbowDiseaseDirections = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

Board.prototype.spreadRainbow = function (arr) {
  arr.forEach((pos) => {
    const randDelt = rainbowDiseaseDirections[Math.floor(Math.random() * 4)];
    if ((pos[0] + randDelt[0] > 0) && (pos[0] + randDelt[0] < this.size) &&
        (pos[1] + randDelt[1] > 0) && (pos[1] + randDelt[1] < this.size)) {
          this.grid[(pos[0] + randDelt[0])][(pos[1] + randDelt[1])].color = 'rainbow';
        }
  });
};

Board.prototype.resetExplodedSpaces = function () {
  this.explodedSpaces = initializeGrid(this.size, ' ');
};

Board.prototype.sphereify = function () {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {
      if (this.grid[ix][iy]) {
        if (this.grid[ix][iy] instanceof Dots.asterisk ||
          this.grid[ix][iy] instanceof Dots.plus ||
          this.grid[ix][iy] instanceof Dots.star)
          this.replaceDot(ix, iy, Dots.sphere);
      }
    }
  }
};

Board.prototype.sphereExplode = function (startCallback, endCallback) {
  for (var ix = 0; ix < this.size; ix++) {
    for (var iy = 0; iy < this.size; iy++) {
      this.grid[ix][iy].color = 'black-out';
    }
  }

  startCallback();

  setTimeout(() => {
    for (var ix = 0; ix < this.size; ix++) {
      for (var iy = 0; iy < this.size; iy++) {
        let oldDot = this.grid[ix][iy];
        oldDot.isKilled = true;
        this.grid[ix][iy] = null;
        this.explodedSpaces[ix][iy] = 'rainbow-explosion';
        this.runDotCallbacks(ix, iy, oldDot);
        this.score += 314 * this.scoreMultiplier;
      }
    }
    this.spheresToExplode = [];
    endCallback();
  }, 1000);
};

Board.prototype.placeRandomDot = function (x, y) {
  let randColor = this.colors[Math.floor(Math.random() * this.colors.length)];

  const newDot = (new Dots.circle({
    color: randColor,
    pos: [x, y],
    id: this.dotIdentifier
  }));

  if (this.fruitify && Math.floor(Math.random() * 10) === 0 ) newDot.fruitify();

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

      this.checkStarsAndAsterisks(ix, iy);
      this.checkNumInDelta(ix, iy, 6, [0, 1], update);
      this.checkNumInDelta(ix, iy, 6, [1, 0], update);
      this.checkTnLz(ix,iy);
      this.checkNumInDelta(ix, iy, 5, [0, 1], update);
      this.checkNumInDelta(ix, iy, 5, [1, 0], update);
      this.checkClusters(ix, iy);
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
      if (this.grid[ix][iy] && this.grid[ix][iy].color !== 'rainbow' && this.grid[ix][iy].color !== 'grey-out') {
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

Board.prototype.killBigX = function (x, y) {
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach((deltaPos) => {
    let dx = deltaPos[0];
    let dy = deltaPos[1];
    for (var i = 0;
      (x + i * dx >= 0 && x + i * dx < this.size) &&
      (y + i * dy >= 0 && y + i * dy < this.size); i++) {
      this.removeDot(x + i * dx, y + i * dy);
    }
  });
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

Board.prototype.setDotForRemoval = function (x, y) {
  this.dotsToExplode[x][y] = true;
};

Board.prototype.removeDot = function (x, y) {
  if (this.grid[x][y] === null) { return; }
  let oldDot = this.grid[x][y];

  if (this.fruitify && oldDot.isFruit)  this.score += 1000 * this.scoreMultiplier;

  if (!(oldDot instanceof Dots.sphere)) {
    oldDot.isKilled = true;
    this.grid[x][y] = null;
    this.explodedSpaces[x][y] = oldDot.color;
    this.runDotCallbacks(x, y, oldDot);
  }

  this.runDotExplosions(x, y, oldDot);
};

Board.prototype.runDotCallbacks = function(x, y, dot) {
  if (dot instanceof Dots.star) {
    this.explosionCallbacks.star();
  } else if (dot instanceof Dots.square) {
    this.explosionCallbacks.square();
  } else if (dot instanceof Dots.plus) {
    this.explosionCallbacks.plus();
  } else if (dot instanceof Dots.triangle) {
    this.explosionCallbacks.triangle();
  } else if (dot instanceof Dots.heart) {
    this.explosionCallbacks.heart();
  } else if (dot instanceof Dots.asterisk) {
    this.explosionCallbacks.asterisk();
  } else if (dot instanceof Dots.sphere) {
    this.explosionCallbacks.sphere();
  }
};

Board.prototype.runDotExplosions = function(x, y, dot) {
  if (dot instanceof Dots.star) {
    this.killColor(dot.color);
  } else if (dot instanceof Dots.square) {
    this.killCross(x, y);
  } else if (dot instanceof Dots.plus) {
    this.killBigX(x, y);
  } else if (dot instanceof Dots.triangle) {
    this.killTri(x, y);
  } else if (dot instanceof Dots.heart) {
    this.killSquare(x, y);
  } else if (dot instanceof Dots.asterisk) {
    this.changeColors(dot.color);
  } else if (dot instanceof Dots.sphere) {
    dot.color = 'grey-out';
    this.spheresToExplode.push(dot);
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
  if (!this.verifyValidPositions([x, y], [x + 1, y], [x, y +1], [x + 1, y + 1]) ||
    this.grid[x][y].color === 'rainbow' || this.grid[x][y].color === 'grey-out') { return; }

  const thisColor = this.grid[x][y].color;
  if ((this.grid[x + 1][y].color === thisColor) &&
      (this.grid[x + 1][y + 1].color === thisColor) &&
      (this.grid[x][y + 1].color === thisColor)) {

    this.setDotForRemoval(x, y + 1);
    this.setDotForRemoval(x + 1, y);
    this.setDotForRemoval(x + 1, y + 1);
    this.replaceDot(x, y, Dots.heart);

    this.score += scoreConv[4] * this.scoreMultiplier;
  }

};

Board.prototype.checkTnLz = function (x, y) {
  if (((x + 2 >= this.size) || (y + 2 >= this.size)) ||
    (this.grid[x][y] && (this.grid[x][y].color === 'rainbow' || this.grid[x][y].color === 'grey-out'))) {
    return;
  }

  for (var dy = 0; dy < 3; dy ++) {
    if (this.grid[x][y + dy] && this.grid[x + 1][y + dy] && this.grid[x + 2][y + dy] &&
        !this.dotsToExplode[x][y + dy] && !this.dotsToExplode[x + 1][y + dy] && !this.dotsToExplode[x + 2][y + dy]) {
      const thisColor = this.grid[x][y + dy].color;
      if (this.grid[x + 1][y + dy].color === thisColor && this.grid[x + 2][y + dy].color === thisColor) {
        for (var dx = 0; dx < 3; dx ++) {
          if (this.verifyValidPositions([x + dx, y], [x + dx, y + 1], [x + dx, y + 2])) {
            if (this.grid[x + dx][y].color === thisColor &&
              this.grid[x + dx][y + 1].color === thisColor &&
              this.grid[x + dx][y + 2].color === thisColor) {

                if (dx !== 0) this.setDotForRemoval(x, y + dy);
                if (dx !== 1) this.setDotForRemoval(x + 1, y + dy);
                if (dx !== 2) this.setDotForRemoval(x + 2, y + dy);

                if (dy !== 0) this.setDotForRemoval(x + dx, y);
                if (dy !== 1) this.setDotForRemoval(x + dx, y + 1);
                if (dy !== 2) this.setDotForRemoval(x + dx, y + 2);


                this.replaceDot(x + dx, y + dy, Dots.plus);

                this.score += scoreConv[5] * this.scoreMultiplier;
              }
          }
        }
      }
    }
  }

};


Board.prototype.checkNumInDelta = function (x, y, num, dPos, callback) {
  const dx = dPos[0];
  const dy = dPos[1];
  const size = this.size;

  if (this.grid[x][y] && this.grid[x][y].id &&
    (x + ((num - 1) * dx) < size) && (y + ((num - 1) * dy) < size) &&
    this.grid[x][y].color !== 'rainbow' && this.grid[x][y].color !== 'grey-out') {

    const initColor = this.grid[x][y].color;
    let sameColor = true;

    for (var i = 0; i < num && sameColor; i++) {
      if (!this.verifyValidPositions([x + dx * i, y + dy * i]) ||
        this.grid[x + dx * i][y + dy * i].color !== initColor) {
        sameColor = false;
      }
    }


    if (sameColor && i === num) {
      for (var j = 0; j < num; j++) {
        if (Math.floor(num / 2) === j) {
          this.replaceDot(x + dx * j, y + dy * j, dotNumConv[num]);
        } else {
          this.setDotForRemoval(x + dx * j, y + dy * j);
        }
      }
      this.score += scoreConv[num];
    }
  }
};

Board.prototype.checkStarsAndAsterisks = function (x, y) {
  if (this.grid[x][y] instanceof Dots.star || this.grid[x][y] instanceof Dots.asterisk || this.grid[x][y] instanceof Dots.plus) {
    if (x + 1 < this.size && (this.grid[x + 1][y] instanceof Dots.star || this.grid[x + 1][y] instanceof Dots.asterisk || this.grid[x + 1][y] instanceof Dots.plus))  {
      this.replaceDot(x, y, Dots.sphere);
      this.removeDot(x + 1, y);
      this.sphereify();
    }
    else if (y + 1 < this.size && (this.grid[x][y + 1] instanceof Dots.star || this.grid[x][y + 1] instanceof Dots.asterisk ||  this.grid[x][y + 1] instanceof Dots.plus))  {
      this.replaceDot(x, y, Dots.sphere);
      this.removeDot(x, y + 1);
      this.sphereify();
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
