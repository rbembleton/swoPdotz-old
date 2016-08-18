const Util = require('./util');
const Dot = require('./dot');

let CircleDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'circle';
  this.icon = '•';
};

Util.inherits(CircleDot, Dot);


module.exports = CircleDot;
