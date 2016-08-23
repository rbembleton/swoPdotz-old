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
    Liaison.ACTIONinitializeDots(this.props.board);
    this.sizeOfGrids = (400.0 / (this.props.board.size || 16.0));
    return({
      offset: [0,0],
      dots: Liaison.all(),
      explosions: Liaison.explosions(),
      canTheyMove: Liason.isItTimeToMove()
    });
  },

  propTypes: {

  },


  componentDidMount () {
    this.dotListener = Liaison.addListener(this.updateDots);
    this.windowListenerResize = window.addEventListener("resize", this.updateOffset);
    this.updateOffset();
  },

  updateOffset () {
    const boxResize = (this.sizeOfGrids) / 2.0;
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({offset: [myRect.left + boxResize, myRect.bottom + (400 - boxResize)]});
  },

  updateDots () {
    this.setState({
      dots: Liaison.all() ,
      explosions: Liaison.explosions(),
      canTheyMove: Liason.isItTimeToMove()
    });

  },

  componentWillUnmount() {
    Liaison.ACTIONclearBoard();
    window.removeEventListener('resize', this.windowListenerResize);
    Liaison.removeListener(this.dotListener);
  },




  render () {
    let dispGrid = [];
    // const canTheyMove = Liaison.isItTimeToMove();

    for (var ix = 0; ix < this.props.board.size; ix++) {
      for (var iy = 0; iy < this.props.board.size; iy++) {
        dispGrid.push(
          <DropGrid
            key={ix * 100 + iy}
            pos={[ix,iy]}
            sizeOfGrids={this.sizeOfGrids}
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
          canIMove={this.state.canTheyMove}
          sizeOfGrids={this.sizeOfGrids}
          numOfGrids={this.props.board.size}
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
