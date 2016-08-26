const React = require('react');
const Liaison = require('./gameplay/liaison');
const hashHistory = require('react-router').hashHistory;


const GameOverModal = React.createClass({

  getInitialState() {
    this.modalFlag = 0;
    return({ isWon: false, isLost: false, showModal: false });
  },

  componentDidMount() {
    this.scoreListener = Liaison.addListener(this.updateGameOverModal);
  },

  componentWillUnmount () {
    Liaison.removeListener(this.scoreListener);
  },

  clickBack (e) {
    e.preventDefault();
    hashHistory.push('home');
  },

  clickNext (e) {
    e.preventDefault();
    hashHistory.push(`next_level/${e.target.id}`);
  },

  getOutOfModal (e) {
    e.preventDefault();
    this.setState({ showModal: false });
  },

  updateGameOverModal () {
    switch (Liaison.isOver()) {
      case 'won':
        this.modalFlag ++;
        this.setState({ isWon: true });
        break;
      case 'lost':
        this.modalFlag ++;
        this.setState({ isLost: true });
        break;
      case undefined:
        break;
    }

    if (this.modalFlag === 1) {
      this.setState({ showModal: true });
    }
  },

  render () {
    let modalToRender;

    const nextLevel = (this.props.levelType.nextLevel ? (
      <div>
        <div id={this.props.levelType.nextLevel} className="back-to-levels" onClick={this.clickNext}>
          {`Next Level: ${this.props.levelType.nextLevel} >>`}
        </div>
      </div>
      ) : "" );

    const retry = (this.state.isWon ?
      <div id={this.props.levelType.name} className="try-again" onClick={this.clickNext}>
        {`Try Again?`}
      </div>
      :
      <div id={this.props.levelType.name} className="try-again" onClick={this.clickNext}>
        {`Replay?`}
      </div>
    );

    if ((this.state.isWon || this.state.isLost) && this.state.showModal === true) {
      modalToRender = (
        <div>
          <div className="win-lose-modal" onClick={this.getOutOfModal}/>
          <div className="modal-content">
            <h2>{this.state.isWon ? " YOU WON! " : " YOU LOST! "}</h2>
            <div className="back-to-levels" onClick={this.clickBack}>
              {"<< Back to Main Screen"}
            </div>
            {this.state.isWon ? nextLevel : ""}
            {retry}
          </div>
        </div>
      );
    }

    return (
      <div>
        {modalToRender}
      </div>
    );
  }


});

module.exports = GameOverModal;
