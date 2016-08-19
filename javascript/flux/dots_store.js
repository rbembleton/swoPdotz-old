const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('./dispatcher');
const DotActionConstants = require('./dot_action_constants');
const Dots = require('../dots/all_dots');
const Colors = require('../constants/colors');
const Shapes = require('../constants/shapes');
const Board = require('../gameplay/board');

// let _board.dotsById = {};
// let _dotIdentifier = 0;
let _board = new Board();

const DotsStore = new Store (AppDispatcher);

function resetDots () {
  _board = new Board();
  // _dotsById = {};
  // _dotIdentifier = 0;

  for (var ix = 0; ix < 16; ix++) {

    for (var iy = 0; iy < 16; iy++) {
      let randColor = Object.keys(Colors)[Math.floor(Math.random() * 8)];
      // let randShape = Object.keys(Shapes)[Math.floor(Math.random() * 2)];

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

  _board.checkInARows(fillInTop);
}

function switchDots(dots) {
  const dot1 = _board.dotsById[dots[0].id];
  const dot2 = _board.dotsById[dots[1].id];
  const tempPos = dot1.pos;
  dot1.pos = dot2.pos;
  dot2.pos = tempPos;

  _board.setValAt(dot1.pos, dot1);
  _board.setValAt(dot2.pos, dot2);
  _board.checkInARows(fillInTop);
}

function snapDot(dot) {
  _board.setValAt(dot.pos, dot);
  _board.dotsById[dot.id] = dot;
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

function update() {
  DotsStore.__emitChange();
}

function endAnimation(dot) {
  _board.dotsById[dot.id].style = 'dropped';
  _board.dotsById[dot.id].oldPos = null;

  // window.setTimeout(() => {
  //   _board.dotsById[dot.id].style = ' ';
  // }, 500);
}

function addDot(dot) {
  _board.dotsById[dot.id] = dot;
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
    update();
  } else {
    _board.checkInARows(fillInTop);
  }
}

DotsStore.score = function () {
  return _board.score;
};


DotsStore.all = function () {
  let retArr = [];

  Object.keys(_board.dotsById).forEach((id) => {
    // if (_board.dotsById[id].pos[0] === -1 && _board.dotsById[id].pos[0] === -1) {
    if (_board.dotsById[id].isKilled === true) {

      delete _board.dotsById[id];
      return;
    }
    retArr.push(objDeepDup(_board.dotsById[id]));
  });

  return retArr;
};

DotsStore.byId = function (id) {
  return objDeepDup(_board.dotsById[id]);
};

DotsStore.at = function (pos) {
  if (!_board.getValAt(pos)) { return null; }
  return objDeepDup(_board.getValAt(pos));
};


DotsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DotActionConstants.INITIALIZE_DOTS:
      resetDots();
      break;
    case DotActionConstants.SWITCH_DOTS:
      switchDots(payload.dots);
      break;
    case DotActionConstants.SNAP_DOT_TO_ORIGIN:
      snapDot(payload.dot);
      break;
    case DotActionConstants.ADD_DOT:
      addDot(payload.dot);
      break;
    case DotActionConstants.END_DOT_ANIMATION:
      endAnimation(payload.dot);
      break;
  }
  DotsStore.__emitChange();

};

module.exports = DotsStore;
