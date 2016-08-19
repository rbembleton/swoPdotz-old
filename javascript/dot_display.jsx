const React = require('react');
const PropTypes = React.PropTypes;
const Dots = require('./dots/all_dots');
const Colors = require('./constants/colors');
const Shapes = require('./constants/shapes');
const DotsStore = require('./flux/dots_store');
const DotActions = require('./flux/dot_actions');
import { DragSource } from 'react-dnd';

const dotSource = {
  beginDrag(props) {
    return { dot: props.dot };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      DotActions.snapToOrigin(props.dot);
    }
    // return { dot: props.dot };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    dragOver: monitor.didDrop()
  };
}


const DotDisplay = React.createClass({

  getInitialState () {
    return({ pos: this.props.pos });
  },

  changePos(e) {
    const newPos = [
      ((e.pageX - this.props.offset[0]) / 25) ,
      ((this.props.offset[1] - e.pageY) / 25)
    ];

    if (newPos[0] < 0) {newPos[0] = 0;}
    if (newPos[1] < 0) {newPos[1] = 0;}
    if (newPos[0] > 15) {newPos[0] = 15;}
    if (newPos[1] > 15) {newPos[1] = 15;}

    this.setState({ pos: newPos });
  },

  switchDots(e) {
    e.preventDefault();
  },

  // componentWillReceiveProps() {
  //
  //   // this.setState({ pos: this.props.pos });
  // },

  componentDidMount () {
    this.dotListener = DotsStore.addListener(this.updateDot);
  },

  componentWillUnmount () {
    this.dotListener.remove();
  },

  updateDot () {
    let thisDot = DotsStore.byId(this.props.dot.id);
    // if (thisDot.style === 'drop') {
    //   this.setState({ pos: thisDot.oldPos });
    //   DotActions.endDotAnimation(thisDot);
    // } else {
      this.setState({ pos: thisDot.pos });
    // }
  },

  checkPos () {
    console.log('hi');
  },


  render () {

    let pos = {
      bottom: `${this.state.pos[1] * 25}px`,
      left: `${this.state.pos[0] * 25}px`
    };

    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div
        draggable={true}
        className={"dot-cont " + this.props.dot.style}
        style={pos}
        onDrag={this.changePos}
      >
        <div className={this.props.dot.color + " " + this.props.dot.shape}>
          {this.props.dot.icon}
        </div>
      </div>
    );
  }

});

DotDisplay.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

module.exports = DragSource('Dot', dotSource, collect)(DotDisplay);
// module.exports = Dot;
