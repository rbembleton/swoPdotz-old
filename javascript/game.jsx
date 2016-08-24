const React = require('react');
const Score = require('./score');
const BoardDisplay = require('./board_display');
const hashHistory = require('react-router').hashHistory;
const BoardLevels = require('./constants/board_levels');
const Goals = require('./goals');

const Game = React.createClass({

  clickBack (e) {
    e.preventDefault();
    hashHistory.push('home');
  },


  render () {

    return (
      <div>
        <div className="back-to-levels" onClick={this.clickBack}>
          {"<< Back to Main Screen"}
        </div>
        <Goals />
        <div className="screen">
          <BoardDisplay board={BoardLevels[this.props.params.gameType]}/>
        </div>
        <Score />
      </div>
    );
  }

});


module.exports = Game;
