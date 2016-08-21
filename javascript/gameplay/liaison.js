const React = require('react');
const Dots = require('../dots/all_dots');
// const Colors = require('../constants/colors');
// const Shapes = require('../constants/shapes');
const Board = require('./board');

const explosionCallbacks = {
  star: explodeStar,
  square: explodeSquare,
  triangle: explodeTriangle,
  heart: explodeHeart,
  asterisk: explodeAsterisk
};

let _board = new Board({ callbacks: explosionCallbacks });
let _listeners = [];

let Liaison = function () {
};


Liaison.addListener = function (callback) {
  _listeners.push(callback);
  return (_listeners.length - 1);
};

Liaison.broadcastChanges = function () {
  _listeners.forEach((callback) => {
    if (callback === undefined) {return;}
    callback();
  });
};

Liaison.removeListener = function (idx) {
  _listeners[idx] = undefined;
};

function clearBoard () {
  _board.grid = {};
  _board.dotsById = {};
  _board.score = 0;
  _board = new Board({});
}

function resetDots (options) {
  _board = new Board({
    callbacks: explosionCallbacks,
    size: options.size,
    colors: options.colors
  });
  _board.placeDots();
  Liaison.broadcastChanges();
  setTimeout((() => {
    _board.resetExplodedSpaces();
    removeGroups();
  }), 200);
}

function explodeStar(x, y) {
  // console.log('star!');
}
function explodeAsterisk(x, y) {
  // console.log('asterisk!');
}
function explodeTriangle(x, y) {
  // console.log('triangle!');
}
function explodeSquare(x, y) {
  // console.log('square!');
}
function explodeHeart(x, y) {
  // console.log('heart!');
}

function switchDots(dots) {
  const dot1 = _board.dotsById[dots[0].id];
  const dot2 = _board.dotsById[dots[1].id];
  const tempPos = dot1.pos;
  dot1.pos = dot2.pos;
  dot2.pos = tempPos;

  _board.setValAt(dot1.pos, dot1);
  _board.setValAt(dot2.pos, dot2);

  Liaison.broadcastChanges();
  setTimeout((() => {
    _board.resetExplodedSpaces();
    removeGroups();
  }), 200);
}

function snapDot(dot) {
  _board.setValAt(dot.pos, dot);
  _board.dotsById[dot.id] = dot;
  Liaison.broadcastChanges();
}

function objDeepDup(obj) {
  let newObject = {};

  Object.keys(obj).forEach((key) => {
    newObject[key] = unknwnTypeDup(obj[key]);
  });

  return newObject;
}

function unknwnTypeDup(val) {
  if (val instanceof Array) {
    return val.map((el) => unknwnTypeDup(el));
  } else if (val instanceof Object) {
    return objDeepDup(val);
  } else {
    return val;
  }
}

// function justUpdate() {
//   Liaison.broadcastChanges();
// }

// run this first
function removeGroups() {
  _board.checkInARows(boardDrop);
}

// second callback
function boardDrop() {
  Liaison.broadcastChanges();
  setTimeout((() => {
    _board.resetExplodedSpaces();
    _board.columnsDrop(updateDisplay);
  }), 400);
}

// third callback
function updateDisplay () {
  Liaison.broadcastChanges();
  setTimeout((() => {
    _board.resetExplodedSpaces();
    fillInTop();
  }), 400);
}

function fillInTop() {
  const noFills = _board.fillInTop();

  if (noFills) {
    setTimeout((() => {
      Liaison.broadcastChanges();
    }), 400);
  } else {
    Liaison.broadcastChanges();
    setTimeout((() => {
      _board.resetExplodedSpaces();
      removeGroups();
    }), 400);
  }
}

//    STORE FUNCTIONS

Liaison.explosions = function () {
  // console.log(_board.explodedSpaces);
  return _board.explodedSpaces;
};

Liaison.score = function () {
  return _board.score;
};

Liaison.continueUpdate = function () {
  return (_board.continueUpdate);
};

Liaison.all = function () {
  let retArr = [];

  Object.keys(_board.dotsById).forEach((id) => {
    if (_board.dotsById[id].isKilled === true) {

      delete _board.dotsById[id];
      return;
    }
    retArr.push(objDeepDup(_board.dotsById[id]));
  });

  return retArr;
};

Liaison.byId = function (id) {
  return objDeepDup(_board.dotsById[id]);
};

Liaison.at = function (pos) {
  if (!_board.getValAt(pos)) { return null; }
  return objDeepDup(_board.getValAt(pos));
};


// ACTIONS FUNCTIONS


Liaison.ACTIONinitializeDots = function (options) {
  resetDots(options);
};

Liaison.ACTIONsnapToOrigin = function (dot) {
  snapDot(dot);
};

Liaison.ACTIONswitchDots = function (dot1, dot2) {
  switchDots([dot1, dot2]);
};

Liaison.ACTIONremoveGroups = function () {
  removeGroups();
};

Liaison.ACTIONboardDrop = function () {
  boardDrop();
};

Liaison.ACTIONfillInBoard = function () {
  fillInTop();
};

Liaison.ACTIONclearBoard = function () {
  clearBoard();
};

module.exports = Liaison;
