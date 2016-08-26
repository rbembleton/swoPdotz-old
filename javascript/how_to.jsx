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
            <span className="icon-geo-triangle triangle red"/>
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
            <span className="icon-like-3 orange heart"/>
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
            <span className="icon-geo-square yellow square"/>
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
              <span className="icon-star teal star"/>
              <div className="description">
                {"Exploding stars destroy all dots"}
                <br/>{"on the board of their color"}
              </div>
          </div>

          <div className="rule">
            <span className="make-square" style={{textAlign: 'left'}}>
              <span className="icon-geo-circle aqua"/><br/>
              <span className="icon-geo-circle aqua"/><br/>
              <span className="icon-geo-circle aqua"/>
              <span className="icon-geo-circle aqua"/>
              <span className="icon-geo-circle aqua"/>
            </span>
            or
            <span className="make-square">
              <span className="icon-geo-circle aqua"/><br/>
              <span className="icon-geo-circle aqua"/>
              <span className="icon-geo-circle aqua"/>
              <span className="icon-geo-circle aqua"/><br/>
              <span className="icon-geo-circle aqua"/>
            </span>
            or
            <span className="make-square">
              <span className="icon-geo-circle aqua"/>
              <span className="icon-geo-circle aqua"/>
              <span className="icon-geo-circle aqua"/><br/>
              <span className="icon-geo-circle aqua"/><br/>
              <span className="icon-geo-circle aqua"/>
            </span>
            {" = "}
            <span className="icon-plus aqua plus"/>
            <div className="description">
              {"Exploding pluses destroy all dots"}
              <br/>{"in both diagonals from them"}
            </div>
          </div>


          <div className="rule">
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>
            <span className="icon-geo-circle indigo"/>{" = "}
            <span className="icon-asterisk indigo asterisk"/>
            <div className="description">
              {"Exploding asterisks changes the color of all the dots on the board to that of the asterisk"}
            </div>
          </div>

          <div className="rule">
            {"Any combination of two "}
            <span className="icon-plus purple plus"/>
            {", "}
            <span className="icon-star purple star"/>
            {", or "}
            <span className="icon-asterisk purple asterisk"/>
            {" = "}
            <span className="icon-geo-sphere rainbow"/>
            <div className="description">
              {"Spheres are powerful and provide large bonuses, but they can only be destroyed by exploding them with other dots, and will spread the 'rainbow' virus to nearby dots, rendering them unmatchable"}
            </div>
          </div>


        </div>
      </div>
    );
  }

});


module.exports = Game;
