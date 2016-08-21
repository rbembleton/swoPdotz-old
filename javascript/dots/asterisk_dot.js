const Util = require('./util');
const Dot = require('./dot');

let AsteriskDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'asterisk';
  this.icon = '*';
  this.iconClass = 'icon-asterisk';

};

Util.inherits(AsteriskDot, Dot);



module.exports = AsteriskDot;
