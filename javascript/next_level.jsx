const React = require('react');
const hashHistory = require('react-router').hashHistory;

const NextLevel = React.createClass({


  componentDidMount () {
    // const gamePush = this.props.params.gameType.substring(0,2) === 'm-' ?
    //   `m/game/${this.props.params.gameType.substring(2)}` :
    //   `game/${this.props.params.gameType}`;
    // hashHistory.push(gamePush);
    hashHistory.push(`game/${this.props.params.gameType}`);
  },


  render () {

    return (
      <div className="levels-select">

      </div>
    );
  }

});

module.exports = NextLevel;
