const React = require('react');
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
let _preventMove = true;
let _moves;
let _numOfType = resetNumOfType();
let _levelGoals = resetLevelGoals();
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
  _moves = undefined;
  _levelGoals = resetLevelGoals();
  _numOfType = resetNumOfType();
}

function resetDots (options) {
  _board = new Board({
    callbacks: explosionCallbacks,
    size: options.size,
    colors: options.colors
  });
  _board.placeDots();

  _numOfType = resetNumOfType();
  _moves = options.moves || undefined;
  _levelGoals = resetLevelGoals(options.goals);

  Liaison.broadcastChanges();
  setTimeout((() => {
    _board.resetExplodedSpaces();
    removeGroups();
  }), 200);
}

function resetLevelGoals (goalsObj = {}) {
  return {
    triangle: goalsObj.triangle || undefined,
    square: goalsObj.square || undefined,
    star: goalsObj.star || undefined,
    heart: goalsObj.heart || undefined,
    asterisk: goalsObj.asterisk || undefined,
  };
}

function resetNumOfType () {
  return {
    triangle: 0,
    square: 0,
    heart: 0,
    star: 0,
    asterisk: 0
  };
}

function explodeStar(x, y) {
  _numOfType.star ++;
}

function explodeAsterisk(x, y) {
  _numOfType.asterisk ++;
}

function explodeTriangle(x, y) {
  _numOfType.triangle ++;
}

function explodeSquare(x, y) {
  _numOfType.square ++;
}

function explodeHeart(x, y) {
  _numOfType.heart ++;
}

function switchDots(dots) {
  _preventMove = true;
  const dot1 = _board.dotsById[dots[0].id];
  const dot2 = _board.dotsById[dots[1].id];
  const tempPos = dot1.pos;
  dot1.pos = dot2.pos;
  dot2.pos = tempPos;

  _board.setValAt(dot1.pos, dot1);
  _board.setValAt(dot2.pos, dot2);

  _moves --;

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


// run this first
function removeGroups() {
  _board.scoreMultiplier ++;
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
      _preventMove = false;
      _board.scoreMultiplier = 0;
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

Liaison.isItTimeToMove = function () {
  return (_preventMove === false);
};

Liaison.levelStatus = function () {
  return {
    movesLeft: _moves,
    star: levelStatusHelper('star'),
    triangle: levelStatusHelper('triangle'),
    square: levelStatusHelper('square'),
    asterisk: levelStatusHelper('asterisk'),
    heart: levelStatusHelper('heart'),
    levelCompleted: completedHelper()
  };
};

function completedHelper () {
  let allTrue = true;
  ['star', 'heart', 'triangle', 'square', 'asterisk'].forEach((el) => {
    if (_levelGoals[el] && _levelGoals[el] !== 'completed') {
      allTrue = false;
    }
  });

  return allTrue;
}

function levelStatusHelper (kind) {
    if (_levelGoals[kind]) {
      if (_levelGoals[kind] === 'completed') {
        return 0;
      } else if( _levelGoals[kind] - _numOfType[kind] > 0) {
        return _levelGoals[kind] - _numOfType[kind];
      } else {
        _levelGoals[kind] = 'completed';
        // return "✔";
        return 0;
      }
    } else {
      return undefined;
    }
}

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
