const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
const Main = require('./main');
const HomeScreen = require('./home_screen');
const Game = require('./game');

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={HomeScreen}/>
      <Route path="home" component={HomeScreen}/>
      <Route path="game" component={Game}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('main');
  ReactDOM.render(router, root);
});
