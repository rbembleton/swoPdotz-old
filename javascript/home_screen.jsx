const React = require('react');
const hashHistory = require('react-router').hashHistory;


const HomeScreen = React.createClass({

  playGame (e) {
    e.preventDefault();
    hashHistory.push('game');
  },

  render () {

    return (
      <div>
        <div className="play-button">
          <button onClick={this.playGame}>Play game</button>
        </div>
      </div>
    );
  }

});

module.exports = HomeScreen;


// <div className="red">Whatsup?!</div>
// <div className="orange">Whatsup?!</div>
// <div className="yellow">Whatsup?!</div>
// <div className="green">Whatsup?!</div>
// <div className="aqua">Whatsup?!</div>
// <div className="blue">Whatsup?!</div>
// <div className="indigo">Whatsup?!</div>
// <div className="purple">Whatsup?!</div>
