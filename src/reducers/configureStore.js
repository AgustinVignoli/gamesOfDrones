import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import createRootReducer from './index';

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(
        thunk,
        promiseMiddleware(),
        routerMiddleware(history),
      ),
    ),
  );
  return store;
}
