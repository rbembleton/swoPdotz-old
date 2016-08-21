const React = require('react');


const Particle = React.createClass({

  getInitialState() {
    return({ animationClass: 'start',
      style: {
        top: '50%',
        left: '50%',
      } });
  },

  componentDidMount () {
    const that = this;
    setTimeout((() => {
      if (that.isMounted()) {
        that.setState( {
          animationClass: 'finish',
          style:
          { top: `${Math.floor(Math.random() * 120 - 62)}px`,
            left: `${Math.floor(Math.random() * 120 - 62)}px`,
          }});
      }
    }), 10);
  },


  render () {

    return (
      <div
        className={"particle " + this.props.color + ' ' + this.state.animationClass}
        style={this.state.style}
      >
      </div>
    );
  }

});




module.exports = Particle;
