const Util = require('./util');
const Dot = require('./dot');
const FruitDotConstants = require('../constants/fruit_dot_constants');

let CircleDot = function (options) {
  Dot.call(this, {
    color: options.color,
    pos: options.pos,
    id: options.id
  });
  this.shape = 'circle';
  this.icon = '•';
  this.iconClass = 'icon-geo-circle';

};

Util.inherits(CircleDot, Dot);


CircleDot.prototype.fruitify = function () {
  this.iconClass = FruitDotConstants.fruitify[Math.floor(Math.random() * 6)];
  this.isFruit = true;
};

CircleDot.prototype.defruitify = function () {
  this.iconClass = 'icon-geo-circle';
};

module.exports = CircleDot;
