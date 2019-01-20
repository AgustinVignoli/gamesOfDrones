import { handleActions } from 'redux-actions';
import {
  SAVE_CONFIG_PENDING,
  SAVE_CONFIG_FULFILLED,
  SAVE_CONFIG_REJECTED,
  LOAD_CONFIG_PENDING,
  LOAD_CONFIG_FULFILLED,
  LOAD_CONFIG_REJECTED,
} from '../constants';

const configurationReducer = handleActions(
  {
    [SAVE_CONFIG_PENDING]: state => ({
      ...state,
      isLoaded: false,
    }),
    [SAVE_CONFIG_FULFILLED]: (state, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        savedConfig: data,
        isLoaded: true,
      };
    },
    [SAVE_CONFIG_REJECTED]: (state, action) => {
      const errors = state.errors ? [...state.errors] : [];

      return {
        ...state,
        errors: [...errors, action.payload],
        isLoaded: true,
      };
    },
    [LOAD_CONFIG_PENDING]: state => ({
      ...state,
      isLoaded: false,
    }),
    [LOAD_CONFIG_FULFILLED]: (state, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        savedConfig: data,
        isLoaded: true,
      };
    },
    [LOAD_CONFIG_REJECTED]: (state, action) => {
      const errors = state.errors ? [...state.errors] : [];

      return {
        ...state,
        errors: [...errors, action.payload],
        isLoaded: true,
      };
    },
  },
  {},
);

export default configurationReducer;
