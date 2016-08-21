const React = require('react');
const PropTypes = React.PropTypes;
const DropGrid = require('./drop_grid');
const DotDisplay = require('./dot_display');
const ReactDOM = require('react-dom');
const Liaison = require('./gameplay/liaison');

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { default as TouchBackend } from 'react-dnd-touch-backend';



const BoardDisplay = React.createClass({
  getInitialState () {
    return({
      offset: [0,0],
      dots: Liaison.all(),
      explosions: Liaison.explosions()
    });
  },

  propTypes: {

  },


  componentDidMount () {
    this.dotListener = Liaison.addListener(this.updateDots);
    Liaison.ACTIONinitializeDots(this.props.board);

    this.windowListenerResize = window.addEventListener("resize", this.updateOffset);
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    this.setState({offset: [myRect.left + 12.5, myRect.bottom + 387.5]});
  },

  updateOffset () {
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({offset: [myRect.left + 12.5, myRect.bottom + 387.5]});
  },

  updateDots () {
    this.setState({
      dots: Liaison.all() ,
      explosions: Liaison.explosions()
    });

  },

  componentWillUnmount() {
    Liaison.ACTIONclearBoard();
    window.removeEventListener('resize', this.windowListenerResize);
    // this.windowListener.remove();
    Liaison.removeListener(this.dotListener);
  },




  render () {
    let dispGrid = [];

    for (var ix = 0; ix < 16; ix++) {
      for (var iy = 0; iy < 16; iy++) {
        dispGrid.push(
          <DropGrid
            key={ix * 100 + iy}
            pos={[ix,iy]}
            animateColor={this.state.explosions[ix][iy]}
          />
      );
      }
    }


    const dispAllDots = this.state.dots.map((dot) => {
      return(
        <DotDisplay
          dot={dot}
          pos={dot.pos}
          key={dot.id}
          offset={this.state.offset}/>);
      });

    return (
      <div id="dot-display">
        {dispAllDots}
        {dispGrid}
      </div>
    );
  }

});

export function  swapDots (pos, dot) {
  if (posInRange(pos, dot.pos)) {
    const dotToSwap = Liaison.at(pos);
    Liaison.ACTIONswitchDots(dotToSwap, dot);

  } else {

    Liaison.ACTIONsnapToOrigin(dot);
  }
}

function posInRange(pos1, pos2) {
  return (
    (pos1[0] + 1 === pos2[0] && pos1[1] === pos2[1]) ||
    (pos1[0] - 1 === pos2[0] && pos1[1] === pos2[1]) ||
    (pos1[0] === pos2[0] && pos1[1] + 1 === pos2[1]) ||
    (pos1[0] === pos2[0] && pos1[1] - 1 === pos2[1])
  );
}

module.exports = DragDropContext(HTML5Backend)(BoardDisplay);
// module.exports = DragDropContext(TouchBackend({ enableMouseEvents: true }))(BoardDisplay);
