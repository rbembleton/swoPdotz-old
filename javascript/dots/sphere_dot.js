const Util = require('./util');
const Dot = require('./dot');

let SphereDot = function (options) {
  Dot.call(this, {
    color: 'rainbow',
    pos: options.pos,
    id: options.id
  });
  this.shape = 'sphere';
  this.icon = 'o';
  this.iconClass = 'icon-geo-sphere';

};

Util.inherits(SphereDot, Dot);


module.exports = SphereDot;
