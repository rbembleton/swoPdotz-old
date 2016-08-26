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


  render () {
    const bonusShow = (
      localStorage.one === 'true' && localStorage.two === 'true' && localStorage.three === 'true' ?
      <div style={{display: 'inline'}}>
        <span className="icon-geo-circle teal-hover"/>
        <button id="bonus" onClick={this.playGame}>bonus</button>
      </div>
      : ""
    );

    const bonus2Show = (
      localStorage.four === 'true' && localStorage.five === 'true' && localStorage.six === 'true' && localStorage.seven === 'true' ?
      <div style={{display: 'inline'}}>
        <span className="icon-geo-circle teal-hover"/>
        <button id="bonus2" onClick={this.playGame}>bonus</button>
      </div>
      : ""
    );

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
          {bonusShow}<br/>
          <button id="four" onClick={this.playGame}>four</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="five" onClick={this.playGame}>five</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="six" onClick={this.playGame}>six</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="seven" onClick={this.playGame}>seven</button>
          {bonus2Show}
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
