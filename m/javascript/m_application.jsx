const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
const MHomeScreen = require('./m_home_screen');
const HowTo = require('../../javascript/how_to');
const NextLevel = require('../../javascript/next_level');
const MMain = require('./m_main');
const MGame = require('./m_game');

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={MMain}>
      <IndexRoute component={MHomeScreen}/>
      <Route path="home" component={MHomeScreen}/>
      <Route path="how" component={HowTo}/>
      <Route path="game/:gameType" component={MGame}/>
      <Route path="next_level/:gameType" component={NextLevel}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('main');
  ReactDOM.render(router, root);
});
