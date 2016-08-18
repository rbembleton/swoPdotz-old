const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('./dispatcher');
const DotActionConstants = require('./dot_action_constants');
const Dots = require('../dots/all_dots');
const Colors = require('../constants/colors');
const Shapes = require('../constants/shapes');

let _dotsByPos = {};
let _dotsById = {};
let _dotIdentifier = 0;

const DotsStore = new Store (AppDispatcher);

function resetDots () {
  _dotsByPos = {};
  _dotsById = {};
  _dotIdentifier = 0;

  for (var ix = 0; ix < 16; ix++) {
    _dotsByPos[ix] = {};

    for (var iy = 0; iy < 16; iy++) {
      let randColor = Object.keys(Colors)[Math.floor(Math.random() * 8)];
      let randShape = Object.keys(Shapes)[Math.floor(Math.random() * 5)];

      const newDot = (new Dots[randShape]({
        color: randColor,
        pos: [ix, iy],
        id: _dotIdentifier
      }));

      _dotsById[_dotIdentifier] = newDot;
      _dotsByPos[ix][iy] = newDot;
      _dotIdentifier++;
    }
  }
}

function switchDots(dots) {
  const dot1 = _dotsById[dots[0].id];
  const dot2 = _dotsById[dots[1].id];
  const tempPos = dot1.pos;
  dot1.pos = dot2.pos;
  dot2.pos = tempPos;
  _dotsByPos[dot1.pos[0]][dot1.pos[1]] = dot1;
  _dotsByPos[dot2.pos[0]][dot2.pos[1]] = dot2;
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

DotsStore.all = function () {
  let retArr = [];

  Object.keys(_dotsById).forEach((id) => {
    retArr.push(objDeepDup(_dotsById[id]));
  });

  return retArr;
};

DotsStore.byId = function (id) {
  return objDeepDup(_dotsById[id]);
};

DotsStore.at = function (pos) {
  if (!_dotsByPos[pos[0]]) { return null; }
  return objDeepDup(_dotsByPos[pos[0]][pos[1]]);
};


DotsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DotActionConstants.INITIALIZE_DOTS:
      resetDots();
      break;
    case DotActionConstants.UPDATE_POSITION:
      resetPhotos(payload.dot);
      break;
    case DotActionConstants.SWITCH_DOTS:
      switchDots(payload.dots);
      break;
  }
  DotsStore.__emitChange();

};

module.exports = DotsStore;
