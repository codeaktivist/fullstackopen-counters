import { createSlice } from '@reduxjs/toolkit';
import redisService from '../services/redisService';

const initialState = 0;

const redisSlice = createSlice({
  name: 'redis',
  initialState,
  reducers: {
    setCounter(state, action) {
      return action.payload;
    }
  }
});

export const redisInit = () => {
  return async dispatch => {
    const counter = await redisService.getCounter();
    dispatch(setCounter(counter));
  };
};

export const redisIncrement = () => {
  return async dispatch => {
    const counter = await redisService.incrementCounter();
    dispatch(setCounter(counter));
  };
};

export const redisDecrement = () => {
  return async dispatch => {
    const counter = await redisService.decrementCounter();
    dispatch(setCounter(counter));
  };
};

export const redisReset = () => {
  return async dispatch => {
    const counter = await redisService.resetCounter();
    dispatch(setCounter(counter));
  };
};

export const { setCounter } = redisSlice.actions;
export default redisSlice.reducer;