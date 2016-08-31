const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
const Main = require('./main');
const HomeScreen = require('./home_screen');
const Game = require('./game');
const HowTo = require('./how_to');
const NextLevel = require('./next_level');
const Mobile = require('./mobile');
const MGame = require('./mobile/m_game');

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={HomeScreen}/>
      <Route path="home" component={HomeScreen}/>
      <Route path="game/:gameType" component={Game}/>
      <Route path="next_level/:gameType" component={NextLevel}/>
      <Route path="how" component={HowTo}/>
    </Route>
    <Route path="m" component={Mobile}>
      <Route path="game/:gameType" component={MGame}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('main');
  ReactDOM.render(router, root);
});
