const React = require('react');

const DotsDivider = React.createClass({
  render () {
    return (
      <div className="dots-divider">
        <span className="icon-geo-circle pink-hover"/>
        <span className="icon-geo-circle red-hover"/>
        <span className="icon-geo-circle orange-hover"/>
        <span className="icon-geo-circle yellow-hover"/>
        <span className="icon-geo-circle green-hover"/>
        <span className="icon-geo-circle teal-hover"/>
        <span className="icon-geo-circle aqua-hover"/>
        <span className="icon-geo-circle blue-hover"/>
        <span className="icon-geo-circle indigo-hover"/>
        <span className="icon-geo-circle purple-hover"/>
      </div>
    );
  }
});

module.exports = DotsDivider;
