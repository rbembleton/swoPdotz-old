const React = require('react');
const Dots = require('./dots/all_dots');
const Colors = require('./constants/colors');
const Shapes = require('./constants/shapes');

const Dot = React.createClass({

  getInitialState () {
    return({ pos: this.props.dot.pos });
  },

  changePos(e) {
    // console.log(e.pageX, e.pageY);
    // debugger
    const newPos = [
      ((e.pageX - this.props.offset[0]) / 25) ,
      ((this.props.offset[1] - e.pageY) / 25)
    ];
    console.log(newPos);
    this.setState({ pos: newPos });
  },

  render () {

    const pos = {
      bottom: `${this.state.pos[1] * 25}px`,
      left: `${this.state.pos[0] * 25}px`
    };

    return (
      <div draggable={true} className="dot-cont" style={pos} onDrag={this.changePos}>
        <div className={this.props.dot.color + " " + this.props.dot.shape}>
          {this.props.dot.icon}
        </div>
      </div>
    );
  }

});

module.exports = Dot;
