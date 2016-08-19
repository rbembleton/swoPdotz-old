const React = require('react');
const Liason = require('./gameplay/liason');

const Score = React.createClass({

  getInitialState() {
    return({ score: Liason.score() || 0 });
  },

  componentDidMount() {
    this.scoreListener = Liason.addListener(this.updateScore);
  },

  componentWillUnmount () {
    Liason.removeListener(this.scoreListener);
  },

  updateScore () {
    this.setState({ score: Liason.score() });
  },

  render () {

    return (
      <div className="score-cont">
        {this.state.score}
      </div>
    );
  }


});

module.exports = Score;
