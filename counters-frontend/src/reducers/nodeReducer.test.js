import nodeReducer from './nodeReducer';
import deepFreeze from 'deep-freeze';

describe('nodeReducer', () => {
  test('returns new state with action node/setCounter', () => {
    const state = 0;
    const action = {
      type: 'node/setCounter',
      payload: 7
    };

    deepFreeze(state);
    const newState = nodeReducer(state, action);
    expect(newState).toEqual(action.payload);
  });
});