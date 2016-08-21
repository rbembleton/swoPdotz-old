const React = require('react');
const hashHistory = require('react-router').hashHistory;

const Game = React.createClass({

  clickBack (e) {
    e.preventDefault();
    hashHistory.push('home');
  },


  render () {

    return (
      <div>
        <div className="back-to-levels" onClick={this.clickBack}>
          {"<< Back to Main Screen"}
        </div>
        <div className="how-to">
          <div className="rule">
            <span className="icon-geo-circle red"/>
            <span className="icon-geo-circle red"/>
            <span className="icon-geo-circle red"/>{" = "}
            <span className="icon-geo-triangle red"/>
            <div className="description">
              {"Exploding triangles destroy the three dots"}
              <br/>{"due north, south-west and south-east"}
            </div>
          </div>

          <div className="rule">
            <span className="make-square">
              <span className="icon-geo-circle orange"/>
              <span className="icon-geo-circle orange"/><br/>
              <span className="icon-geo-circle orange"/>
              <span className="icon-geo-circle orange"/>
            </span>
            {" = "}
            <span className="icon-like-3 orange"/>
            <div className="description">
              {"Exploding hearts destroy dots"}
              <br/>{"in the 5 x 5 square around them"}
            </div>
          </div>

          <div className="rule">
            <span className="icon-geo-circle yellow"/>
            <span className="icon-geo-circle yellow"/>
            <span className="icon-geo-circle yellow"/>
            <span className="icon-geo-circle yellow"/>{" = "}
            <span className="icon-geo-square yellow"/>
            <div className="description">
              {"Exploding squares destroy all dots"}
              <br/>{"in their row and column"}
            </div>
          </div>

          <div className="rule">
            <span className="icon-geo-circle teal"/>
            <span className="icon-geo-circle teal"/>
            <span className="icon-geo-circle teal"/>
            <span className="icon-geo-circle teal"/>
            <span className="icon-geo-circle teal"/>{" = "}
            <span className="icon-star teal"/>
            <div className="description">
              {"Exploding stars destroy all dots"}
              <br/>{"on the board of their color"}
            </div>
          </div>

          <div className="rule">
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>{" = "}
            <span className="icon-asterisk indigo"/>
            <div className="description">
              {"Exploding asterisks changes the color of all the dots on the board to that of the asterisk"}
            </div>
          </div>


        </div>
      </div>
    );
  }

});


module.exports = Game;
