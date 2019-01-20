import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Particles from 'react-particles-js';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './reducers/configureStore';
import { Home } from './components/home';
import Game from './components/game';
import { Config } from './components/config';
import 'normalize.css';
import './index.css';

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

const store = configureStore();

ReactDOM.render(
  <Fragment>
    <Particles {...params} />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/config" component={Config} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </Fragment>,
  document.getElementById('root'),
);
