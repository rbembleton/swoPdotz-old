const React = require('react');
const Liaison = require('../../javascript/gameplay/liaison');
const Goals = require('../../javascript/goals');
const Score = require('../../javascript/score');
const MBoardDisplay = require('./m_board_display');
const hashHistory = require('react-router').hashHistory;
const MBoardLevels = require('./m_board_levels');
const MGameOverModal = require('./m_game_over_modal');

const MGame = React.createClass({

  clickBack (e) {
    e.preventDefault();
    hashHistory.push('home');
  },


  render () {
    const displayGoals = MBoardLevels[this.props.params.gameType].isGoalBased ? <Goals Liaison={Liaison}/> : "";
    const toDispModalOrNotThatIsTheQuestion = MBoardLevels[this.props.params.gameType].isGoalBased ?
      <MGameOverModal levelType={MBoardLevels[this.props.params.gameType]}/> : '';

    return (
      <div>
        <div
          className="back-to-levels"
          onClick={this.clickBack}>
          {"<< Back to Main Screen"}
        </div>
        {displayGoals}
        <div className="m-screen screen">
          <MBoardDisplay board={MBoardLevels[this.props.params.gameType]} />
        </div>
        <Score Liaison={Liaison}/>
        {toDispModalOrNotThatIsTheQuestion}
      </div>
    );
  }

});


module.exports = MGame;
