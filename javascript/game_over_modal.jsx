const React = require('react');
const Liaison = require('./gameplay/liaison');
const hashHistory = require('react-router').hashHistory;


const GameOverModal = React.createClass({

  getInitialState() {
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

  getOutOfModal (e) {
    e.preventDefault();
    this.setState({ showModal: false });
  },

  updateGameOverModal () {
    switch (Liaison.isOver()) {
      case 'won':
        this.setState({ isWon: true, showModal: true });
        break;
      case 'lost':
        this.setState({ isLost: true, showModal: true });
        break;
      case undefined:
        break;
    }
  },

  render () {
    let modalToRender;

    if ((this.state.isWon || this.state.isLost) && this.state.showModal === true) {
      modalToRender = (
        <div>
          <div className="win-lose-modal" onClick={this.getOutOfModal}/>
          <div className="modal-content">
            <h2>{this.state.isWon ? " YOU WON! " : " YOU LOST! "}</h2>
            <div className="back-to-levels" onClick={this.clickBack}>
              {"<< Back to Main Screen"}
            </div>
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
