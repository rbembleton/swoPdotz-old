const React = require('react');
const Liaison = require('../gameplay/liaison');
const hashHistory = require('react-router').hashHistory;


const MGameOverModal = React.createClass({

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
    hashHistory.push(`next_level/${"m-" + e.target.id}`);
  },

  getOutOfModal (e) {
    e.preventDefault();
    this.modalFlag ++;
    this.setState({ showModal: false });
  },

  updateGameOverModal () {
    if (Liaison.isOver() === 'won' && this.modalFlag === 0) {
      localStorage.setItem(this.props.levelType.name, true);
      if (!(localStorage[`${this.props.levelType.name}-score`]) ||
        parseInt(localStorage[`${this.props.levelType.name}-score`]) < Liaison.score()) {
        localStorage.setItem(`${this.props.levelType.name}-score`, Liaison.score());
      }
    }

    if (Liaison.isItTimeToMove()) {
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
    }

    if (this.modalFlag === 1) {
      this.setState({ showModal: true });
    }
  },

  render () {
    let modalToRender;

    const nextLevel = ((this.props.levelType.nextLevel) ? (
        <div id={this.props.levelType.nextLevel} className="back-to-levels" onClick={this.clickNext}>
          {`Next Level: ${this.props.levelType.nextLevel} >>`}
        </div>
      ) : "" );

    if ((this.state.isWon || this.state.isLost) && this.state.showModal === true) {
      modalToRender = ( this.state.isWon ? (
          <div>
            <div className="win-lose-modal" onClick={this.getOutOfModal}/>
            <div className="modal-content">
              <h2 className="unsel win-lose-text">{" YOU WON! "}</h2>
              <div className="back-to-levels" onClick={this.clickBack}>
                {"<< Back to Main Screen"}
              </div>
              {nextLevel}
              <div className="final-score">
                {`Final Score: `}<h2 style={{margin: '0px 0px 20px 0px', fontSize: '60px'}}>{Liaison.score()}</h2>
              {`Your Best Score: `}<h2 style={{display: 'inline', margin: '0'}}>{localStorage[`${this.props.levelType.name}-score`]}</h2>
              </div>

              <div id={this.props.levelType.name} className="try-again" onClick={this.clickNext}>
                {`Try Again?`}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="win-lose-modal" onClick={this.getOutOfModal}/>
            <div className="modal-content">
              <h2 className="unsel win-lose-text">{" YOU LOST! "}</h2>
              <div className="back-to-levels" onClick={this.clickBack}>
                {"<< Back to Main Screen"}
              </div>
              <div id={this.props.levelType.name} className="try-again" onClick={this.clickNext}>
                {`Replay?`}
              </div>
            </div>
          </div>
        )
      );
    }

    return (
      <div>
        {modalToRender}
      </div>
    );
  }


});

module.exports = MGameOverModal;
