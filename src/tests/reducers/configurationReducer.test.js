import reducer from '../../reducers/configurationReducer';
import { SAVE_CONFIG_FULFILLED, LOAD_CONFIG_FULFILLED, LOAD_CONFIG_REJECTED } from '../../constants/configurationReducer';

const mockedConfig = [{ move: 'Piedra', kills: 'Tijera' }, { move: 'Papel', kills: 'Piedra' }, { move: 'Tijera', kills: 'Papel' }];

describe('Configuration reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle SAVE_CONFIG_FULFILLED', () => {
    const successAction = {
      type: SAVE_CONFIG_FULFILLED,
      payload: { data: { moves: mockedConfig } },
    };
    expect(reducer({}, successAction)).toEqual({
      isLoaded: true,
      savedConfig: mockedConfig,
    });
  });

  it('should handle LOAD_CONFIG_FULFILLED', () => {
    const updateAction = {
      type: LOAD_CONFIG_FULFILLED,
      payload: { data: [{ moves: mockedConfig }] },
    };
    expect(reducer({}, updateAction)).toEqual({
      isLoaded: true,
      savedConfig: mockedConfig,
      weaponsList: [
        {
          name: 'Piedra',
          value: 'Piedra',
        },
        {
          name: 'Tijera',
          value: 'Tijera',
        },
        {
          name: 'Papel',
          value: 'Papel',
        },
      ],
    });
  });

  it('should handle LOAD_CONFIG_REJECTED', () => {
    const failAction = {
      type: LOAD_CONFIG_REJECTED,
      payload: 'error',
      errors: ['error'],
    };
    expect(reducer({}, failAction)).toEqual({ errors: ['error'], isLoaded: true });
  });
});
