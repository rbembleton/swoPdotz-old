const Util = require('./util');
const Dot = require('./dot');

let TriangleDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'triangle';
  this.icon = '▴';
  this.iconClass = 'icon-geo-triangle';

};

Util.inherits(TriangleDot, Dot);



module.exports = TriangleDot;
