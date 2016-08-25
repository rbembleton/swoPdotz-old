const Util = require('./util');
const Dot = require('./dot');

let PlusDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'plus';
  this.icon = '+';
  this.iconClass = 'icon-plus';

};

Util.inherits(PlusDot, Dot);



module.exports = PlusDot;
