import { createSlice } from '@reduxjs/toolkit';
import nodeService from '../services/nodeService';

const initialState = 0;

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    setCounter(state, action) {
      return action.payload;
    }
  }
});

export const nodeInit = () => {
  return async dispatch => {
    const counter = await nodeService.getCounter();
    dispatch(setCounter(counter));
  };
};

export const nodeIncrement = () => {
  return async dispatch => {
    const counter = await nodeService.incrementCounter();
    dispatch(setCounter(counter));
  };
};

export const nodeDecrement = () => {
  return async dispatch => {
    const counter = await nodeService.decrementCounter();
    dispatch(setCounter(counter));
  };
};

export const nodeReset = () => {
  return async dispatch => {
    const counter = await nodeService.resetCounter();
    dispatch(setCounter(counter));
  };
};

export const { setCounter } = nodeSlice.actions;
export default nodeSlice.reducer;