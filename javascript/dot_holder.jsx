const React = require('react');
const PropTypes = React.PropTypes;
const Dots = require('./dots/all_dots');
const Colors = require('./constants/colors');
const Shapes = require('./constants/shapes');
const DropTarget = require('react-dnd').DropTarget;

const squareTarget = {
  drop(props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const DotHolder = React.createClass({

  getInitialState () {
    return({ pos: this.props.dot.pos });
  },


  render () {

    let sqPos = {
      bottom: `${this.state.pos[1] * 25}px`,
      left: `${this.state.pos[0] * 25}px`
    };

    const { pos, connectDropTarget, isOver } = this.props;

    return (
      <div
        className="dot-holder"
        style={sqPos}
        data-pos={pos}
      >
      </div>
    );
  }

});

DotHolder.propTypes = {
  pos: PropTypes.array.isRequired,
  isOver: PropTypes.bool.isRequired
};


module.exports = DropTarget('Dot', squareTarget, collect)(DotHolder);
