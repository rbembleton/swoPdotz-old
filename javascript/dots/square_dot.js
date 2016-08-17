const Util = require('./util');
const Dot = require('./dot');

let SquareDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos
  });
  this.shape = 'square';
  this.icon = '▪';
};

Util.inherits(SquareDot, Dot);


module.exports = SquareDot;
