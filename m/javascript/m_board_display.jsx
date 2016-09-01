const React = require('react');
const MDropGrid = require('./m_drop_grid');
const MDotDisplay = require('./m_dot_display');
const ReactDOM = require('react-dom');
const Liaison = require('../../javascript/gameplay/liaison');


const MBoardDisplay = React.createClass({
  getInitialState () {
    Liaison.ACTIONinitializeDots(this.props.board);
    this.sizeOfGrids = (800.0 / (this.props.board.size || 16.0));
    return({
      offset: [0,0],
      dots: Liaison.all(),
      explosions: Liaison.explosions(),
      canTheyMove: Liaison.isItTimeToMove()
    });
  },

  componentDidMount () {
    this.dotListener = Liaison.addListener(this.updateDots);
    window.addEventListener('resize', this.updateOffset);
    this.updateOffset();
    this.updateOffsetTimeout = setTimeout(this.updateOffset, 1000);
  },

  updateOffset () {
    const boxResize = (this.sizeOfGrids) / 2.0;
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({offset: [myRect.left + boxResize, myRect.bottom + (800 - boxResize)]});
  },

  updateDots () {
    this.setState({
      dots: Liaison.all() ,
      explosions: Liaison.explosions(),
      canTheyMove: Liaison.isItTimeToMove()
    });

  },

  componentWillUnmount() {
    Liaison.ACTIONclearBoard();
    removeEventListener('resize', this.updateOffset);
    Liaison.removeListener(this.dotListener);
    clearTimeout(this.updateOffsetTimeout);
  },


  render () {
    let dispGrid = [];

    for (var ix = 0; ix < this.props.board.size; ix++) {
      for (var iy = 0; iy < this.props.board.size; iy++) {
        dispGrid.push(
          <MDropGrid
            key={ix * 100 + iy}
            pos={[ix,iy]}
            sizeOfGrids={this.sizeOfGrids}
            animateColor={this.state.explosions[ix][iy]}
          />
      );
      }
    }

    const moveShieldStyle = {
      zIndex: `${this.state.canTheyMove ? -1 : 6}`
    };


    const dispAllDots = this.state.dots.map((dot) => {
      return(
        <MDotDisplay
          dot={dot}
          pos={dot.pos}
          key={dot.id}
          sizeOfGrids={this.sizeOfGrids}
          numOfGrids={this.props.board.size}
          offset={this.state.offset}/>);
      });

    return (
      <div id="dot-display">
        <div className="move-shield unsel" style={moveShieldStyle} />
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

module.exports = MBoardDisplay;
