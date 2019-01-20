import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'normalize.css';
import './index.css';
import Particles from 'react-particles-js';
import { Home } from './components/home';
import Game from './components/game';
import { Config } from './components/config';

const params = {
  particles: {
    number: { value: 1000 },
    size: { value: 3 },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
    },
  },
};

ReactDOM.render(
  <Fragment>
    <Particles {...params} />
    <Router>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/config" component={Config} />
      </Fragment>
    </Router>
  </Fragment>,
  document.getElementById('root'),
);
