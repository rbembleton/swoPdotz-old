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
    const toDispModalOrNotThatIsTheQuestion = BoardLevels[this.props.params.gameType].isGoalBased ?
      <GameOverModal levelType={BoardLevels[this.props.params.gameType]}/> : '';

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
        {toDispModalOrNotThatIsTheQuestion}
      </div>
    );
  }

});


module.exports = Game;
