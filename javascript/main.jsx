const React = require('react');
const DotsDivider = require('./dots/dots_divider');

// <span className="logo-dot1">{"•"}</span>
// <span className="logo-pd">{"Pd"}</span>
// <span className="logo-dot2">{"•"}</span>

const Main = React.createClass({

  getInitialState () {
    return({renderLogo: true});
  },


  handleLogoClick(e) {
    e.preventDefault();
    this.setState({ renderLogo: false });
    const that = this;
    setTimeout(() => { that.setState({renderLogo: true}); }, 1);
  },
  // 
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ paused: true });
  //   }, 4000);
  // },


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
    ) : (<div className="logo-placeholder"></div>);

    return (
      <div className="main-page clearfix">
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
          <DotsDivider />
        </footer>
      </div>
    );
  }

});

module.exports = Main;
