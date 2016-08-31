const React = require('react');
const DotsDivider = require('./dots/dots_divider');


const Main = React.createClass({

  getInitialState () {
    return({renderLogo: true});
  },


  handleLogoClick(e) {
    e.preventDefault();
    this.setState({ renderLogo: false });
    const that = this;
    setTimeout(() => { that.setState({renderLogo: true}); }, 10);
  },


  render () {

    const thisLogo = this.state.renderLogo ? (
      <div className="logo" onClick={this.handleLogoClick}>
        {"sw"}
        <div className="logo-swap">
          <div className="logo-ball1">{"•"}</div>
          P<span className="logo-ud-p">P</span>
          <div className="logo-ball2">{"•"}</div>
        </div>
        {"tz"}
      </div>
    ) : (<div className="logo-placeholder">{"sw•"}
      P<span className="logo-ud-p">P</span>
      {"•tz"}</div>);

    return (
      <div className="mobile-main main-page clearfix">
        <header className="clearfix unsel">
          {thisLogo}
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
        </footer>
      </div>
    );
  }

});

module.exports = Main;
