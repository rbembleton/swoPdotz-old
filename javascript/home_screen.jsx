const React = require('react');
const hashHistory = require('react-router').hashHistory;
const DotsDivider = require('./dots/dots_divider');

const HomeScreen = React.createClass({

  playGame (e) {
    e.preventDefault();
    hashHistory.push(`game/${e.target.id}`);
  },

  howTo (e) {
    e.preventDefault();
    hashHistory.push(`how`);
  },

  // <span className="icon-geo-circle teal-hover"/>
  // <button id="bonus" onClick={this.playGame}>bonus</button>

  render () {

    return (
      <div className="levels-select">
        <DotsDivider />
        <h2 className='unsel'>Standard Levels</h2>
        <div className="play-button">
          <button id="intro" onClick={this.playGame}>intro</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="one" onClick={this.playGame}>one</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="two" onClick={this.playGame}>two</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="three" onClick={this.playGame}>three</button>
        </div>
        <DotsDivider />
        <h2 className="unsel">Unlimited Levels</h2>
        <div className="play-button">
          <button id="ilikewinning" onClick={this.playGame}>
            {"'I "}<span className="icon-like-3"/>{" Winning' Level"}
          </button>
        </div>
        <div className="play-button">
          <button id="coolcolors" onClick={this.playGame}>Cool Colors Level</button>
        </div>
        <div className="play-button">
          <button id="infinity" onClick={this.playGame}>Infinity Level</button>
        </div>
        <DotsDivider />
        <div className="play-button">
          <button onClick={this.howTo}>How to Play</button>
        </div>
      </div>
    );
  }

});

module.exports = HomeScreen;
