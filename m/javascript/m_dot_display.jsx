const React = require('react');
const Dots = require('../../javascript/dots/all_dots');
const Colors = require('../../javascript/constants/colors');
const Shapes = require('../../javascript/constants/shapes');
const Liaison = require('Liaison');
// const Liaison = require('../../javascript/gameplay/liaison');
const swapDots = require('./m_board_display').swapDots;

const MDotDisplay = React.createClass({

  getInitialState () {
    return({ pos: this.props.pos, specialClass: 'new-dot' });
  },

  handleTouchstart (e) {
  },


  changePos(e) {
    e.preventDefault();

    let myPageX = e.changedTouches[0].pageX;
    let myPageY = e.changedTouches[0].pageY;

    const newPos = [
      ((myPageX - this.props.offset[0]) / this.props.sizeOfGrids) ,
      ((this.props.offset[1] - myPageY) / this.props.sizeOfGrids)
    ];

    if (newPos[0] < 0) {newPos[0] = 0;}
    if (newPos[1] < 0) {newPos[1] = 0;}
    if (newPos[0] > (this.props.numOfGrids - 1)) {newPos[0] = (this.props.numOfGrids - 1);}
    if (newPos[1] > (this.props.numOfGrids - 1)) {newPos[1] = (this.props.numOfGrids - 1);}

    this.setState({ pos: newPos });
  },

  handleTouchEnd(e) {
    swapDots([Math.round(this.state.pos[0]), Math.round(this.state.pos[1])], this.props.dot);
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
      padding: `${(this.props.sizeOfGrids - 25) / 2.0}px`
    };

    return (
      <div
        className={"dot-cont " + this.state.specialClass}
        style={pos}
        draggable={true}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.changePos}
        onTouchEnd={this.handleTouchEnd}
      >
        <div
          className={this.props.dot.color + " m-" + (this.props.dot.isFruit ? "fruit" : this.props.dot.shape)}
          style={margin}>
          <span className={this.props.dot.iconClass}/>
        </div>
      </div>
    );
  }

});


module.exports = MDotDisplay;
