const React = require('react');
const Liaison = require('./gameplay/liaison');

const Score = React.createClass({

  getInitialState() {
    return({
      score: Liaison.score() || 0 ,
      score1: Liaison.score() || 0 ,
      score2: Liaison.score() || 0 ,
      cont: 1});
  },

  componentDidMount() {
    this.scoreListener = Liaison.addListener(this.updateScore);
  },

  componentWillUnmount () {
    Liaison.removeListener(this.scoreListener);
  },

  updateScore () {
    const newScore = Liaison.score();
    if (this.state.score !== newScore) {
      if (this.state.cont === 1) {
        this.setState({
          score: newScore,
          score2: newScore,
          cont: 2
        });
      } else {
        this.setState({
          score: newScore,
          score1: newScore,
          cont: 1
        });
      }
    }
  },

  render () {

    return (
      <div className="score-cont">
        <div
          className="score-cont-1"
          style={{opacity: this.state.cont === 1 ? '1' : '0'}}
        >
          {this.state.score1}
        </div>
        <div
          className="score-cont-2"
          style={{opacity: this.state.cont === 2 ? '1' : '0'}}
        >
          {this.state.score2}
        </div>
      </div>
    );
  }


});

module.exports = Score;
