import { createActions } from 'redux-actions';
import { saveGame as saveGameSvc, loadGame as loadGameSvc } from '../model/services/gameServices';
import { SAVE_GAME, LOAD_GAME } from '../constants';

export const { saveGame, loadGame } = createActions(SAVE_GAME, LOAD_GAME);

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
