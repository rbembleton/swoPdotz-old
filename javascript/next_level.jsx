const React = require('react');
const hashHistory = require('react-router').hashHistory;

const NextLevel = React.createClass({


  componentDidMount () {
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
