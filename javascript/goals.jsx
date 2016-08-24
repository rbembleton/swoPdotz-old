const React = require('react');
const Liaison = require('./gameplay/liaison');

const Goals = React.createClass({

  getInitialState() {
    return({
      levelStatus: Liaison.levelStatus()
    });
  },

  componentDidMount() {
    this.scoreListener = Liaison.addListener(this.updateGoals);
  },

  componentWillUnmount () {
    this.setState({levelStatus: {}});
    Liaison.removeListener(this.scoreListener);
  },

  updateGoals () {
    this.setState({
      levelStatus: Liaison.levelStatus(),

    });
  },

  renderCheck (kind) {
    if (this.state.levelStatus[kind] === 0) {
      return '✔';
    } else {
      return this.state.levelStatus[kind];
    }
  },

  goalsRender () {
    if (this.state.levelStatus.levelCompleted) {
      return (
        <div style={{width: '140px'}}>
          LEVEL COMPLETE!
        </div>
      );
    }

    return (
      <div>
        {this.state.levelStatus.triangle !== undefined ?
          <div>
            <span className="icon-geo-triangle"/>: {this.renderCheck('triangle')}
          </div> : ''}
        {this.state.levelStatus.square !== undefined ?
          <div>
            <span className="icon-geo-square"/>: {this.renderCheck('square')}
          </div> : ''}
        {this.state.levelStatus.heart !== undefined ?
          <div>
            <span className="icon-like-3"/>: {this.renderCheck('heart')}
          </div> : ''}
        {this.state.levelStatus.star !== undefined ?
          <div>
            <span className="icon-star"/>: {this.renderCheck('star')}
          </div> : ''}
        {this.state.levelStatus.asterisk !== undefined ?
          <div>
            <span className="icon-asterisk"/>: {this.renderCheck('asterisk')}
          </div> : ''}
      </div>
    );
  },

  render () {

    const movesStyle = (this.state.levelStatus.movesLeft !== undefined) ? {} : {display: 'none'};

    return (
      <div className="goals-cont clearfix unsel" style={movesStyle}>
        <div className="moves-left-cont">
          Moves: {this.state.levelStatus.movesLeft && this.state.levelStatus.movesLeft > 0 ?
            this.state.levelStatus.movesLeft : 'No more moves left!'}
        </div>
        <div className="goals-left-cont">
          {this.goalsRender()}
        </div>
      </div>
    );
  }


});

module.exports = Goals;
