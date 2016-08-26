const React = require('react');
const Score = require('./score');
const BoardDisplay = require('./board_display');
const hashHistory = require('react-router').hashHistory;
const BoardLevels = require('./constants/board_levels');
const Goals = require('./goals');
const GameOverModal = require('./game_over_modal');

const Game = React.createClass({

  clickBack (e) {
    e.preventDefault();
    hashHistory.push('home');
  },


  render () {
    const displayGoals = BoardLevels[this.props.params.gameType].isGoalBased ? <Goals /> : "";


    return (
      <div>
        <div className="back-to-levels" onClick={this.clickBack}>
          {"<< Back to Main Screen"}
        </div>
        {displayGoals}
        <div className="screen">
          <BoardDisplay board={BoardLevels[this.props.params.gameType]}/>
        </div>
        <Score />
        <GameOverModal />
      </div>
    );
  }

});


module.exports = Game;
