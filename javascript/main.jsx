const React = require('react');
const DotsDivider = require('./dots/dots_divider');


const Main = React.createClass({

  render () {

    return (
      <div className="main-page clearfix">
        <header className="clearfix unsel">
          {"sw•Pd•tz"}
        </header>
        <div className="screen-holder clearfix">
          {this.props.children}
        </div>
        <footer className="clearfix">
          <div className="footer-links clearfix">
            <div className="footer-left">
              <a href="http://webdev.rbembleton.com" target="_blank">
                by RB Embleton
              </a>
            </div>
            <div className="footer-right clearfix">
              <a href="http://webdev.rbembleton.com" target="_blank">
                <span className="click-icons icon-mailru" />
              </a>
              <a href="https://www.linkedin.com/in/rb-embleton-50673a126" target="_blank">
                <span className="click-icons icon-linkedin" />
              </a>
              <a href="http://www.github.com/rbembleton" target="_blank">
                <span className="click-icons icon-github-01" />
              </a>
            </div>
          </div>
          <DotsDivider />
        </footer>
      </div>
    );
  }

});

module.exports = Main;
