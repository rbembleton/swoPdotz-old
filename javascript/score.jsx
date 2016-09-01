const React = require('react');

const Score = React.createClass({

  getInitialState() {
    return({
      score: this.props.Liaison.score() || 0 ,
      score1: this.props.Liaison.score() || 0 ,
      score2: this.props.Liaison.score() || 0 ,
      cont: 1});
  },

  componentDidMount() {
    this.scoreListener = this.props.Liaison.addListener(this.updateScore);
  },

  componentWillUnmount () {
    this.props.Liaison.removeListener(this.scoreListener);
  },

  updateScore () {
    const newScore = this.props.Liaison.score();
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
