import { createActions } from 'redux-actions';
import {
  saveGame as saveGameSvc,
  loadGame as loadGameSvc,
  saveConfig as saveConfigSvc,
  loadConfig as loadConfigSvc,
} from '../model/services/gameServices';
import { SAVE_GAME, LOAD_GAME, SAVE_CONFIG, LOAD_CONFIG } from '../constants';

export const {
  saveGame,
  loadGame,
  saveConfig,
  loadConfig,
} = createActions(SAVE_GAME, LOAD_GAME, SAVE_CONFIG, LOAD_CONFIG);

export function saveNewGame(game) {
  return dispatch => (
    dispatch(saveGame({ promise: saveGameSvc(game) }))
  );
}

export function loadGames() {
  return dispatch => (
    dispatch(loadGame({ promise: loadGameSvc() }))
  );
}

export function saveNewConfig(config) {
  return dispatch => (
    dispatch(saveConfig({ promise: saveConfigSvc(config) }))
  );
}

export function loadPrevConfig() {
  return dispatch => (
    dispatch(loadConfig({ promise: loadConfigSvc() }))
  );
}
