const React = require('react');
const PropTypes = React.PropTypes;
const MParticle = require('./m_particle');
const MDropGrid = React.createClass({

  getInitialState () {
    return ({ animate: ' ' });
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.animateColor !== ' ') {
      this.setState({ animate: nextProps.animateColor });
      const that = this;
      setTimeout((() => {
        if (that.isMounted()) {
          that.removeAnimation();
        }
      }), 600);
    }
  },

  removeAnimation () {
    const that = this;
    that.setState({ animate: ' ' });
  },

  render () {
    let explosion = [];
    let pos = this.props.pos;

    let sqPosZIndex = {
      width: `${this.props.sizeOfGrids}px`,
      height: `${this.props.sizeOfGrids}px`,
      bottom: `${pos[1] * this.props.sizeOfGrids}px`,
      left: `${pos[0] * this.props.sizeOfGrids}px`,
      zIndex: `1`
    };

    if (this.state.animate !== ' ') {
      for (var i = 0; i < 3; i++) {
        explosion.push(
          <MParticle key={i} color={this.state.animate}/>

        );
      }
    }

    return (
      <div
        className={"dot-holder"}
        style={sqPosZIndex}
        data-pos={pos}
      >
        {explosion}
      </div>
    );
  }

});

module.exports = MDropGrid;
