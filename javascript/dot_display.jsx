const React = require('react');
const Dots = require('./dots/all_dots');
const Colors = require('./constants/colors');
const Shapes = require('./constants/shapes');

const Dot = React.createClass({

  getInitialState () {
    return({ pos: this.props.dot.pos, specialClass: '', specialStyle: {} });
  },

  changePos(e) {
    const newPos = [
      ((e.pageX - this.props.offset[0]) / 25) ,
      ((this.props.offset[1] - e.pageY) / 25)
    ];
    console.log(newPos);
    this.removeSpecialClass('highlighted');
    this.setSpecialClass('selected');
    this.setState({ pos: newPos });
    // this.props.dot.pos = this.state.pos;
  },

  confirmPos(e) {
  },

  setSpecialClass(string) {
    if (!this.state.specialClass.includes(string)) {
      const newSpecialClass = this.state.specialClass + " " + string;
      this.setState({specialClass: newSpecialClass});
    }
  },

  removeSpecialClass(string) {
    if (this.state.specialClass.includes(string)) {
      const newSpecialClass = this.state.specialClass.replace(" " + string, "");
      this.setState({specialClass: newSpecialClass});
    }
  },

  highlight(e) {
    this.setSpecialClass('highlighted');
  },

  unhighlight(e) {
    this.removeSpecialClass('highlighted');
  },

  switchDots(e) {
    e.preventDefault();
    debugger
    this.removeSpecialClass('selected');
  },

  render () {

    let pos = {
      bottom: `${this.state.pos[1] * 25}px`,
      left: `${this.state.pos[0] * 25}px`
    };


    const addedClass = this.state.specialClass === '' ? "" : this.state.specialClass;


    return (
      <div
        draggable={true}
        className={"dot-cont " + addedClass}
        style={pos}
        onDrag={this.changePos}
        onMouseEnter={this.highlight}
        onMouseLeave={this.unhighlight}
        onDrop={this.switchDots}
      >
        <div className={this.props.dot.color + " " + this.props.dot.shape}>
          {this.props.dot.icon}
        </div>
      </div>
    );
  }

});

module.exports = Dot;
