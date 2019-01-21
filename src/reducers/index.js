import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import gameReducer from './gameReducer';
import configurationReducer from './configurationReducer';

export default history => combineReducers({
  gameReducer,
  configurationReducer,
  router: connectRouter(history),
});
