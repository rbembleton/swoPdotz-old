const React = require('react');
const PropTypes = React.PropTypes;
const Dots = require('./dots/all_dots');
const Colors = require('./constants/colors');
const Shapes = require('./constants/shapes');
const Liaison = require('./gameplay/liaison');

import { DragSource } from 'react-dnd';

const dotSource = {
  beginDrag(props) {
    return { dot: props.dot, specialClass: ' ' };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      Liaison.ACTIONsnapToOrigin(props.dot);
    }
  }

};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    dragOver: monitor.didDrop(),
  };
}


const DotDisplay = React.createClass({

  getInitialState () {
    return({ pos: this.props.pos, specialClass: 'new-dot' });
  },

  changePos(e) {

    const newPos = [
      ((e.pageX - this.props.offset[0]) / this.props.sizeOfGrids) ,
      ((this.props.offset[1] - e.pageY) / this.props.sizeOfGrids)
    ];

    if (newPos[0] < 0) {newPos[0] = 0;}
    if (newPos[1] < 0) {newPos[1] = 0;}
    if (newPos[0] > (this.props.numOfGrids - 1)) {newPos[0] = (this.props.numOfGrids - 1);}
    if (newPos[1] > (this.props.numOfGrids - 1)) {newPos[1] = (this.props.numOfGrids - 1);}

    this.setState({ pos: newPos });
    // }
  },

  switchDots(e) {
    e.preventDefault();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.dot.shape !== this.props.dot.shape) {
      this.setState({specialClass: 'new-dot'});
    }
    if (nextProps.dot.pos[1] !== this.props.dot.pos[1]) {
      this.setState({specialClass: 'drop', pos: this.props.pos});
      this.setState({specialClass: 'dropped', pos: nextProps.pos});
    } else {
      this.setState({ pos: nextProps.pos });
    }
  },

  newDotRemoveClass () {
    const that = this;
    setTimeout((() => {
      if (that.isMounted()) {
        that.setState({ specialClass: 'new-transition ' });
        that.removeSpecialClasses();
      }
    }), 200);
  },

  removeSpecialClasses () {
    const that = this;
    setTimeout((() => {
      if (that.isMounted()) {
        that.setState({ specialClass: ' ' });
      }
    }), 200);
  },

  changePosDotClass () {
    const that = this;
    setTimeout((() => {
      that.setState({ specialClass: ' ' });
    }), 200);
  },

  componentDidMount () {
    if (this.state.specialClass === 'new-dot') { this.newDotRemoveClass(); }
  },

  componentDidUpdate () {
    if (this.state.specialClass === 'new-dot') { this.newDotRemoveClass(); }
    if (this.state.specialClass === 'drop') { this.changePosDotClass(); }
  },


  checkPos () {
  },


  render () {
    let pos = {
      bottom: `${this.state.pos[1] * this.props.sizeOfGrids}px`,
      left: `${this.state.pos[0] * this.props.sizeOfGrids}px`,
      width: `${this.props.sizeOfGrids}px`,
      height: `${this.props.sizeOfGrids}px`
    };

    let margin = {
      margin: `${(this.props.sizeOfGrids - 25) / 2.0}px`
    };

    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div
        className={"dot-cont " + this.state.specialClass}
        style={pos}
        draggable={true}
        onDrag={this.changePos}
      >
        <div
          className={this.props.dot.color + " " + this.props.dot.shape}
          style={margin}>
          <span className={this.props.dot.iconClass}/>
        </div>
      </div>
    );
  }

});

DotDisplay.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

module.exports = DragSource('Dot', dotSource, collect)(DotDisplay);
