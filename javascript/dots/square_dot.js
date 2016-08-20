const Util = require('./util');
const Dot = require('./dot');

let SquareDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'square';
  this.icon = '▪';
  this.iconClass = 'icon-geo-square';

};

Util.inherits(SquareDot, Dot);


module.exports = SquareDot;
