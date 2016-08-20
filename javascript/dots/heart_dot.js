const Util = require('./util');
const Dot = require('./dot');

let HeartDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'heart';
  this.icon = '♥';
  this.iconClass = 'icon-like-3';
};

Util.inherits(HeartDot, Dot);



module.exports = HeartDot;
