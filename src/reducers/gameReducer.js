import { handleActions, combineActions } from 'redux-actions';
import { filter } from 'lodash';
import {
  SAVE_GAME_PENDING,
  SAVE_GAME_FULFILLED,
  SAVE_GAME_REJECTED,
  LOAD_GAME_PENDING,
  LOAD_GAME_FULFILLED,
  LOAD_GAME_REJECTED,
  DELETE_RECORD_PENDING,
  DELETE_RECORD_FULFILLED,
  DELETE_RECORD_REJECTED,
} from '../constants';

const gameReducer = handleActions(
  {
    [combineActions(SAVE_GAME_PENDING, LOAD_GAME_PENDING, DELETE_RECORD_PENDING)]: state => ({
      ...state,
      isLoaded: false,
    }),
    [combineActions(SAVE_GAME_REJECTED, LOAD_GAME_REJECTED, DELETE_RECORD_REJECTED)]: (state, action) => {
      const errors = state.errors ? [...state.errors] : [];

      return {
        ...state,
        errors: [...errors, action.payload],
        isLoaded: true,
      };
    },
    [SAVE_GAME_FULFILLED]: (state, action) => {
      const { payload: { data } } = action;
      const prevRecords = state.savedGames || [];
      return {
        ...state,
        savedGames: [...prevRecords, data],
        isLoaded: true,
      };
    },
    [LOAD_GAME_FULFILLED]: (state, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        savedGames: data,
        isLoaded: true,
      };
    },
    [DELETE_RECORD_FULFILLED]: (state, action) => {
      const { payload: { data } } = action;
      const updatedList = filter(state.savedGames, ({ _id }) => _id !== data._id);

      return {
        ...state,
        savedGames: updatedList,
        isLoaded: true,
      };
    },
  },
  {},
);

export default gameReducer;
