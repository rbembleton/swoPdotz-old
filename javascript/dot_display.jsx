const React = require('react');
const PropTypes = React.PropTypes;
const Dots = require('./dots/all_dots');
const Colors = require('./constants/colors');
const Shapes = require('./constants/shapes');
const DotsStore = require('./flux/dots_store');
import { DragSource } from 'react-dnd';

const dotSource = {
  beginDrag(props) {
    return { dot: props.dot };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


const DotDisplay = React.createClass({

  getInitialState () {
    return({ pos: this.props.pos, specialClass: '', specialStyle: {} });
  },

  changePos(e) {
    const newPos = [
      ((e.pageX - this.props.offset[0]) / 25) ,
      ((this.props.offset[1] - e.pageY) / 25)
    ];
    this.setState({ pos: newPos });
  },

  switchDots(e) {
    e.preventDefault();

  },

  // componentWillReceiveProps() {
  //   this.setState({ pos: this.props.pos });
  // },

  componentDidMount () {
    this.dotListener = DotsStore.addListener(this.updateDot);
  },

  componentWillUnmount () {
    this.dotListener.remove();
  },

  updateDot () {
    this.setState({ pos: DotsStore.byId(this.props.dot.id).pos });
  },

  render () {

    let pos = {
      bottom: `${this.state.pos[1] * 25}px`,
      left: `${this.state.pos[0] * 25}px`
    };


    const addedClass = this.state.specialClass === '' ? "" : this.state.specialClass;

    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div
        draggable={true}
        className={"dot-cont " + addedClass}
        style={pos}
        onDrag={this.changePos}
        onDrop={this.switchDots}
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
