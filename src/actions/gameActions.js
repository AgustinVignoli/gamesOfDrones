import { createActions } from 'redux-actions';
import {
  saveGame as saveGameSvc,
  loadGame as loadGameSvc,
  saveConfig as saveConfigSvc,
  loadConfig as loadConfigSvc,
  deleteRecord as deleteRecordSvc,
} from '../model/services/gameServices';
import { SAVE_GAME, LOAD_GAME, SAVE_CONFIG, LOAD_CONFIG, DELETE_RECORD } from '../constants';

export const {
  saveGame,
  loadGame,
  saveConfig,
  loadConfig,
  deleteRecord,
} = createActions(SAVE_GAME, LOAD_GAME, SAVE_CONFIG, LOAD_CONFIG, DELETE_RECORD);

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

export function deleteRecordById(id) {
  return dispatch => (
    dispatch(deleteRecord({ promise: deleteRecordSvc(id) }))
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
