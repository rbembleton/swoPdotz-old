const AppDispatcher = require('./dispatcher');
const DotActionConstants = require('./dot_action_constants');

const DotActions = {

  switchDots(dot1, dot2) {
    AppDispatcher.dispatch({
      actionType: DotActionConstants.SWITCH_DOTS,
      dots: [dot1, dot2]
    });
  },

  initializeDots() {
    AppDispatcher.dispatch({
      actionType: DotActionConstants.INITIALIZE_DOTS,
    });
  }
};

module.exports = DotActions;
