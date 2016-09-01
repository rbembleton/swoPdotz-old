const React = require('react');
const hashHistory = require('react-router').hashHistory;
const DotsDivider = require('../../javascript/dots/dots_divider');

const HomeScreen = React.createClass({


  playMobileGame (e) {
    e.preventDefault();
    hashHistory.push(`game/${e.target.id}`);
  },

  howTo (e) {
    e.preventDefault();
    hashHistory.push(`how`);
  },


  render () {
    const bonusShow = (
      localStorage.m_one === 'true' && localStorage.m_two === 'true' && localStorage.m_three === 'true' &&
      localStorage.m_four === 'true' && localStorage.m_five === 'true' && localStorage.m_six === 'true' &&
      localStorage.m_seven === 'true' ?
      <div style={{display: 'inline'}}>
        <span className="icon-geo-circle teal-hover"/>
        <button id="bonus" onClick={this.playMobileGame}>bonus</button>
      </div>
      : ""
    );

    return (
      <div className="levels-select">
        <DotsDivider />
        <h2 className='unsel'>{"Mobile-Friendly Levels"}</h2>
        <div className="play-button">
          <button id="one" onClick={this.playMobileGame}>one</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="two" onClick={this.playMobileGame}>two</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="three" onClick={this.playMobileGame}>three</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="four" onClick={this.playMobileGame}>four</button>
            <br/>
          <button id="five" onClick={this.playMobileGame}>five</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="six" onClick={this.playMobileGame}>six</button>
            <span className="icon-geo-circle teal-hover"/>
          <button id="seven" onClick={this.playMobileGame}>seven</button>
          {bonusShow}
        </div>
        <DotsDivider />
          <div className="play-button">
            <a href="../">
              {"Switch to Desktop Version"}
            </a>
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
