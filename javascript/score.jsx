const React = require('react');
const Liason = require('./gameplay/liason');

const Score = React.createClass({

  getInitialState() {
    return({
      score: Liason.score() || 0 ,
      score1: Liason.score() || 0 ,
      score2: Liason.score() || 0 ,
      cont: 1});
  },

  componentDidMount() {
    this.scoreListener = Liason.addListener(this.updateScore);
  },

  componentWillUnmount () {
    Liason.removeListener(this.scoreListener);
  },

  updateScore () {
    const newScore = Liason.score();
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
