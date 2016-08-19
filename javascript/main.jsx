const React = require('react');
const Score = require('./score');

const Main = React.createClass({

  render () {

    return (
      <div className="main-page clearfix">
        <header className="clearfix">
          {"sw•Pd•tz"}
        </header>
        <div className="screen clearfix">
          {this.props.children}
        </div>
        <Score />
        <footer className="clearfix">

        </footer>
      </div>
    );
  }

});

module.exports = Main;
