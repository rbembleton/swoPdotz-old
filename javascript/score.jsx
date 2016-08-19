const React = require('react');
const DotsStore = require('./flux/dots_store');


const Score = React.createClass({

  getInitialState() {
    return({ score: DotsStore.score() || 0 });
  },

  componentDidMount() {
    this.scoreListener = DotsStore.addListener(this.updateScore);
  },

  componentWillUnmount () {
    this.scoreListener.remove();
  },

  updateScore () {
    this.setState({ score: DotsStore.score() });
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
