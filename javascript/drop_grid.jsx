const React = require('react');
const PropTypes = React.PropTypes;
const swapDots = require('./board_display').swapDots;
const DropTarget = require('react-dnd').DropTarget;
const Particle = require('./particle');


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

  getInitialState () {
    return ({ animate: ' ' });
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.animateColor !== ' ') {
      this.setState({ animate: nextProps.animateColor });
      const that = this;
      setTimeout((() => {
        if (that.isMounted()) {
          that.removeAnimation();
        }
      }), 600);
    }
  },

  removeAnimation () {
    const that = this;
    that.setState({ animate: ' ' });
  },

  render () {
    const { pos, connectDropTarget, currentDragTarget, isOver } = this.props;
    let explosion = [];

    let sqPosZIndex = {
      bottom: `${pos[1] * 25}px`,
      left: `${pos[0] * 25}px`,
      zIndex: `${(currentDragTarget &&
        !(currentDragTarget.dot.pos[0] === pos[0] &&
          currentDragTarget.dot.pos[1] === pos[1])) ? '5' : '1'}`
    };

    if (this.state.animate !== ' ') {
      for (var i = 0; i < 4; i++) {
        explosion.push(
          <Particle key={i} color={this.state.animate}/>

        );
      }
    }

    return connectDropTarget(
      <div
        className={"dot-holder"}
        style={sqPosZIndex}
        data-pos={pos}
      >
        {explosion}
      </div>
    );
  }

});

DropGrid.propTypes = {
  pos: PropTypes.array.isRequired,
  isOver: PropTypes.bool.isRequired
};


module.exports = DropTarget('Dot', squareTarget, collect)(DropGrid);
