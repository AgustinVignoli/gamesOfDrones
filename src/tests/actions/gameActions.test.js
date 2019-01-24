import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import gameReducer from '../../reducers/gameReducer';
import configurationReducer from '../../reducers/configurationReducer';

import {
  saveGame as saveGameSvc,
  loadGame as loadGameSvc,
  saveConfig as saveConfigSvc,
  loadConfig as loadConfigSvc,
  deleteRecord as deleteRecordSvc,
} from '../../model/services/gameServices';

import { saveNewGame, loadGames, deleteRecordById, saveNewConfig, loadPrevConfig } from '../../actions/gameActions';

jest.mock('../../model/services/gameServices');

describe('Game of Drones action test', () => {
  let store;

  beforeEach(() => {
    jest.resetAllMocks();
    store = createStore(combineReducers({ gameReducer, configurationReducer }), compose(applyMiddleware(thunk, promiseMiddleware())));
  });

  const mockedConfig = [{ move: 'Piedra', kills: 'Tijera' }, { move: 'Papel', kills: 'Piedra' }, { move: 'Tijera', kills: 'Papel' }];
  const mockedHistory = [
    {
      _id: 0,
      winner: 'Juan',
      looser: 'Pedro',
      rounds: [
        {
          winner: 'Juan',
          looser: 'Pedro',
          movement: { killer: 'Piedra', killed: 'Tijera' },
        },
        {
          winner: 'Juan',
          looser: 'Pedro',
          movement: { killer: 'Piedra', killed: 'Tijera' },
        },
        {
          winner: 'Juan',
          looser: 'Pedro',
          movement: { killer: 'Piedra', killed: 'Tijera' },
        },
      ],
    },
  ];

  it('dispatch SAVE_GAME_FULFILLED action on successfull fetch', async () => {
    saveGameSvc.mockReturnValueOnce(Promise.resolve({ data: [] }));

    const result = await store.dispatch(saveNewGame([]));
    expect(saveGameSvc).toBeCalledWith([]);
    expect(result.action.type).toEqual('SAVE_GAME_FULFILLED');
    expect(result.action.payload).toEqual({ data: [] });
  });

  it('dispatch LOAD_GAME_FULFILLED action on successfull fetch', async () => {
    loadGameSvc.mockReturnValueOnce(Promise.resolve({ data: mockedHistory }));

    const result = await store.dispatch(loadGames());
    expect(result.action.type).toEqual('LOAD_GAME_FULFILLED');
    expect(result.action.payload).toEqual({ data: mockedHistory });
  });

  it('dispatch DELETE_RECORD_FULFILLED action on successfull fetch', async () => {
    deleteRecordSvc.mockReturnValueOnce(Promise.resolve({ data: mockedHistory }));

    const result = await store.dispatch(deleteRecordById(0));
    expect(result.action.type).toEqual('DELETE_RECORD_FULFILLED');
    expect(result.action.payload).toEqual({ data: mockedHistory });
  });

  it('dispatch SAVE_CONFIG_FULFILLED action on successfull fetch', async () => {
    saveConfigSvc.mockReturnValueOnce(Promise.resolve({ data: { moves: mockedConfig } }));

    const result = await store.dispatch(saveNewConfig({ data: { moves: mockedConfig } }));
    expect(result.action.type).toEqual('SAVE_CONFIG_FULFILLED');
    expect(result.action.payload).toEqual({ data: { moves: mockedConfig } });
  });

  it('dispatch LOAD_CONFIG_FULFILLED action on successfull fetch', async () => {
    loadConfigSvc.mockReturnValueOnce(Promise.resolve({ data: [{ moves: mockedConfig }] }));

    const result = await store.dispatch(loadPrevConfig());
    expect(result.action.type).toEqual('LOAD_CONFIG_FULFILLED');
    expect(result.action.payload).toEqual({ data: [{ moves: mockedConfig }] });
  });
});
