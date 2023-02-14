import reactReducer from './reactReducer';
import deepFreeze from 'deep-freeze';

describe('reactReducer', () => {
  test('returns new state with action react/setCounter', () => {
    const state = 0;
    const action = {
      type: 'react/setCounter',
      payload: 9
    };

    deepFreeze(state);
    const newState = reactReducer(state, action);
    expect(newState).toEqual(action.payload);
  });
});