const React = require('react');
const PropTypes = React.PropTypes;
const DropGrid = require('./drop_grid');
const DotDisplay = require('./dot_display');
const ReactDOM = require('react-dom');
const DotActions = require('./flux/dot_actions');
const DotsStore = require('./flux/dots_store');

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


const Game = React.createClass({
  getInitialState () {
    return({ offset: [0,0], dots: DotsStore.all() });
  },

  propTypes: {

  },


  componentDidMount () {
    this.dotsListener = DotsStore.addListener(this.updateDots);
    DotActions.initializeDots();
    
    this.windowListener = window.addEventListener("resize", this.updateOffset);
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    this.setState({offset: [myRect.left + 12.5, myRect.bottom + 387.5]});

  },

  updateOffset () {
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({offset: [myRect.left, myRect.bottom + 400]});
  },

  updateDots () {
    this.setState({ dots: DotsStore.all() });
  },

   componentWillUnmount() {
      this.windowListener.remove();
      this.dotsListener.remove();
   },




  render () {
    let dispGrid = [];

    for (var ix = 0; ix < 16; ix++) {
      for (var iy = 0; iy < 16; iy++) {
        dispGrid.push(
          <DropGrid
            key={ix * 100 + iy}
            pos={[ix,iy]}
          />
      );
      }
    }


    const dispAllDots = this.state.dots.map((dot, idx) => {
      return(
        <DotDisplay
          dot={dot}
          pos={dot.pos}
          key={idx}
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
   const dotToSwap = DotsStore.at(pos);
   DotActions.switchDots(dotToSwap, dot);
}

module.exports = DragDropContext(HTML5Backend)(Game);
// module.exports = Game;
