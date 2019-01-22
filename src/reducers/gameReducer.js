import { handleActions } from 'redux-actions';
import {
  SAVE_GAME_PENDING,
  SAVE_GAME_FULFILLED,
  SAVE_GAME_REJECTED,
  LOAD_GAME_PENDING,
  LOAD_GAME_FULFILLED,
  LOAD_GAME_REJECTED,
} from '../constants';

const gameReducer = handleActions({
  [SAVE_GAME_PENDING]: state => ({
    ...state,
    isLoaded: false,
  }),
  [SAVE_GAME_FULFILLED]: (state, action) => {
    const { payload: { data } } = action;
    const prevRecords = state.savedGames || [];
    return {
      ...state,
      savedGames: [
        ...prevRecords,
        data,
      ],
      isLoaded: true,
    };
  },
  [SAVE_GAME_REJECTED]: (state, action) => {
    const errors = state.errors ? [...state.errors] : [];

    return {
      ...state,
      errors: [...errors, action.payload],
      isLoaded: true,
    };
  },
  [LOAD_GAME_PENDING]: state => ({
    ...state,
    isLoaded: false,
  }),
  [LOAD_GAME_FULFILLED]: (state, action) => {
    const { payload: { data } } = action;

    return {
      ...state,
      savedGames: data,
      isLoaded: true,
    };
  },
  [LOAD_GAME_REJECTED]: (state, action) => {
    const errors = state.errors ? [...state.errors] : [];

    return {
      ...state,
      errors: [...errors, action.payload],
      isLoaded: true,
    };
  },
}, {});

export default gameReducer;
