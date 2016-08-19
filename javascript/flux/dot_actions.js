const AppDispatcher = require('./dispatcher');
const DotActionConstants = require('./dot_action_constants');

const DotActions = {

  switchDots(dot1, dot2) {
    AppDispatcher.dispatch({
      actionType: DotActionConstants.SWITCH_DOTS,
      dots: [dot1, dot2]
    });
  },

  snapToOrigin(dot) {
    AppDispatcher.dispatch({
      actionType: DotActionConstants.SNAP_DOT_TO_ORIGIN,
      dot: dot
    });
  },

  endDotAnimation(dot) {
    AppDispatcher.dispatch({
      actionType: DotActionConstants.END_DOT_ANIMATION,
      dot: dot
    });
  },

  addDot(dot) {
    AppDispatcher.dispatch({
      actionType: DotActionConstants.SNAP_DOT_TO_ORIGIN,
      dot: dot
    });
  },

  initializeDots() {
    AppDispatcher.dispatch({
      actionType: DotActionConstants.INITIALIZE_DOTS,
    });
  }
};

module.exports = DotActions;
