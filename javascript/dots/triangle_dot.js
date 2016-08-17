const Util = require('./util');
const Dot = require('./dot');

let TriangleDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos
  });
  this.shape = 'triangle';
  this.icon = '▴';
};

Util.inherits(TriangleDot, Dot);



module.exports = TriangleDot;
