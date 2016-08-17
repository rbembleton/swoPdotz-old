const React = require('react');

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
        <footer className="clearfix">

        </footer>
      </div>
    );
  }

});

module.exports = Main;
