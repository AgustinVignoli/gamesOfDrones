import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import gameReducer from './gameReducer';

export default history => combineReducers({
  router: connectRouter(history),
  gameReducer,
});
