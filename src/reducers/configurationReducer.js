import { handleActions, combineActions } from 'redux-actions';
import {
  SAVE_CONFIG_PENDING,
  SAVE_CONFIG_FULFILLED,
  SAVE_CONFIG_REJECTED,
  LOAD_CONFIG_PENDING,
  LOAD_CONFIG_FULFILLED,
  LOAD_CONFIG_REJECTED,
} from '../constants';
import { getWeapons } from '../model/filters/weaponsListFilter';

const configurationReducer = handleActions(
  {
    [combineActions(SAVE_CONFIG_PENDING, LOAD_CONFIG_PENDING)]: state => ({
      ...state,
      isLoaded: false,
    }),
    [combineActions(SAVE_CONFIG_REJECTED, LOAD_CONFIG_REJECTED)]: (state, action) => {
      const errors = state.errors ? [...state.errors] : [];

      return {
        ...state,
        errors: [...errors, action.payload],
        isLoaded: true,
      };
    },
    [SAVE_CONFIG_FULFILLED]: (state, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        savedConfig: data,
        isLoaded: true,
      };
    },
    [LOAD_CONFIG_FULFILLED]: (state, action) => {
      const { payload: { data: [{ moves }] } } = action;
      return {
        ...state,
        savedConfig: moves,
        weaponsList: getWeapons(moves),
        isLoaded: true,
      };
    },
  },
  {},
);

export default configurationReducer;
