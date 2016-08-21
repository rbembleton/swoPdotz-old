const React = require('react');
const PropTypes = React.PropTypes;
const swapDots = require('./board_display').swapDots;
const DropTarget = require('react-dnd').DropTarget;


const squareTarget = {
  drop(props, monitor) {
    swapDots(props.pos, monitor.getItem().dot);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentDragTarget: monitor.getItem()
  };
}

const DropGrid = React.createClass({

  render () {
    const { pos, connectDropTarget, currentDragTarget, isOver } = this.props;

    let sqPosZIndex = {
      bottom: `${pos[1] * 25}px`,
      left: `${pos[0] * 25}px`,
      zIndex: `${(currentDragTarget &&
        !(currentDragTarget.dot.pos[0] === pos[0] &&
          currentDragTarget.dot.pos[1] === pos[1])) ? '5' : '1'}`
    };


    return connectDropTarget(
      <div
        className="dot-holder"
        style={sqPosZIndex}
        data-pos={pos}
      >
      </div>
    );
  }

});

DropGrid.propTypes = {
  pos: PropTypes.array.isRequired,
  isOver: PropTypes.bool.isRequired
};


module.exports = DropTarget('Dot', squareTarget, collect)(DropGrid);
