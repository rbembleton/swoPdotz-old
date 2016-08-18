const Util = require('./util');
const Dot = require('./dot');

let StarDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'star';
  this.icon = '★';
};

Util.inherits(StarDot, Dot);



module.exports = StarDot;
