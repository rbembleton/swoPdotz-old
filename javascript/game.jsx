const React = require('react');
const DotDisplay = require('./dot_display');
const Dots = require('./dots/all_dots');
const Colors = require('./constants/colors');
const Shapes = require('./constants/shapes');
const ReactDOM = require('react-dom');

const Game = React.createClass({
  getInitialState () {
    return({ offset: [0,0], dots: [] });
  },


  componentDidMount () {
    this.windowListener = window.addEventListener("resize", this.updateOffset);
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    console.log(myRect);
    this.setState({offset: [myRect.left + 12.5, myRect.bottom + 387.5]});
    this.initializeDots();
  },

  updateOffset () {
    let myRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    console.log(myRect);
    this.setState({offset: [myRect.left, myRect.bottom + 400]});
  },

   componentWillUnmount() {
      this.windowListener.remove();
   },

   initializeDots () {

     let newDots = [];

     for (var ix = 0; ix < 16; ix++) {
       for (var iy = 0; iy < 16; iy++) {
         let randColor = Object.keys(Colors)[Math.floor(Math.random() * 8)];
         let randShape = Object.keys(Shapes)[Math.floor(Math.random() * 5)];
         newDots.push(new Dots[randShape]({color: randColor, pos: [ix, iy]}));
       }
     }
     this.setState({dots: newDots});
   },

  render () {
    // const dispAllDots = Object.keys(Dots).map((dotType, idx) => {
    //   const dot = new Dots[dotType]({color: 'red', pos: [idx,idx]});
    //
    //   return (
    //     <DotDisplay key={idx} dot={dot}/>
    //   );
    // });
    const dispAllDots = this.state.dots.map((dot, idx)=> {
      return(
        <DotDisplay
          key={idx}
          dot={dot}
          offset={this.state.offset}
        />
      );
    });


    return (
      <div id="dot-display">
        {dispAllDots}
      </div>
    );
  }

});

module.exports = Game;
