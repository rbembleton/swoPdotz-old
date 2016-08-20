const React = require('react');
const Dots = require('../dots/all_dots');
const Colors = require('../constants/colors');
const Shapes = require('../constants/shapes');
const Board = require('./board');

const explosionCallbacks = {
  star: explodeStar,
  square: explodeStar,
  triangle: explodeStar,
  heart: explodeStar
};

let _board = new Board({callbacks: explosionCallbacks});
let _listeners = [];

let Liason = function () {
};


Liason.addListener = function (callback) {
  _listeners.push(callback);
  return (_listeners.length - 1);
};

Liason.broadcastChanges = function () {
  _listeners.forEach((callback) => {
    if (callback === undefined) {return;}
    callback();
  });
};

Liason.removeListener = function (idx) {
  _listeners[idx] = undefined;
};

function resetDots () {
  _board = new Board({callbacks: explosionCallbacks});

  for (var ix = 0; ix < 16; ix++) {

    for (var iy = 0; iy < 16; iy++) {
      let randColor = Object.keys(Colors)[Math.floor(Math.random() * 8)];

      const newDot = (new Dots.circle({
        color: randColor,
        pos: [ix, iy],
        id: _board.dotIdentifier
      }));

      _board.dotsById[_board.dotIdentifier] = newDot;
      _board.setValAt([ix,iy], newDot);
      _board.dotIdentifier++;
    }
  }

  Liason.broadcastChanges();
  removeGroups();
}

function explodeStar(x, y) {
  // Liason.broadcastChanges();
  console.log('star!');
}

function switchDots(dots) {
  const dot1 = _board.dotsById[dots[0].id];
  const dot2 = _board.dotsById[dots[1].id];
  const tempPos = dot1.pos;
  dot1.pos = dot2.pos;
  dot2.pos = tempPos;

  _board.setValAt(dot1.pos, dot1);
  _board.setValAt(dot2.pos, dot2);

  _board.continueUpdate = 1;
  Liason.broadcastChanges();
  setTimeout((() => {
    removeGroups();
  }), 200);
}

function snapDot(dot) {
  _board.setValAt(dot.pos, dot);
  _board.dotsById[dot.id] = dot;
  Liason.broadcastChanges();
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
//   Liason.broadcastChanges();
// }

// run this first
function removeGroups() {
  _board.checkInARows(boardDrop);
}

// second callback
function boardDrop() {
  Liason.broadcastChanges();
  setTimeout((() => {
    _board.columnsDrop(updateDisplay);
  }), 400);
}

// third callback
function updateDisplay () {
  Liason.broadcastChanges();
  setTimeout((() => {
    fillInTop();
  }), 400);
}

function fillInTop() {
  let noFills = true;

  for (var ix = 0; ix < 16; ix++) {

    for (var iy = 0; iy < 16; iy++) {
      if (!_board.getValAt([ix, iy])) {
        let randColor = Object.keys(Colors)[Math.floor(Math.random() * 8)];
        // let randShape = Object.keys(Shapes)[Math.floor(Math.random() * 5)];

        const newDot = (new Dots.circle({
          color: randColor,
          pos: [ix, iy],
          id: _board.dotIdentifier
        }));

        _board.dotsById[_board.dotIdentifier] = newDot;
        _board.setValAt([ix,iy], newDot);
        _board.dotIdentifier++;
        noFills = false;
      }
    }
  }

  if (noFills) {
    setTimeout((() => {
      Liason.broadcastChanges();
    }), 400);
  } else {
    Liason.broadcastChanges();
    setTimeout((() => {
      removeGroups();
    }), 400);
  }
}

//    STORE FUNCTIONS

Liason.score = function () {
  return _board.score;
};

Liason.continueUpdate = function () {
  return (_board.continueUpdate);
};

Liason.all = function () {
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

Liason.byId = function (id) {
  return objDeepDup(_board.dotsById[id]);
};

Liason.at = function (pos) {
  if (!_board.getValAt(pos)) { return null; }
  return objDeepDup(_board.getValAt(pos));
};


// ACTIONS FUNCTIONS


Liason.ACTIONinitializeDots = function () {
  resetDots();
};

Liason.ACTIONsnapToOrigin = function (dot) {
  snapDot(dot);
};

Liason.ACTIONswitchDots = function (dot1, dot2) {
  switchDots([dot1, dot2]);
};

Liason.ACTIONremoveGroups = function () {
  removeGroups();
};

Liason.ACTIONboardDrop = function () {
  boardDrop();
};

Liason.ACTIONfillInBoard = function () {
  fillInTop();
};

module.exports = Liason;
