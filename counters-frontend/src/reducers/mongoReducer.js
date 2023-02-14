import { createSlice } from '@reduxjs/toolkit';
import mongoService from '../services/mongoService';

const initialState = 0;

const mongoSlice = createSlice({
  name: 'mongo',
  initialState,
  reducers: {
    setCounter(state, action) {
      return action.payload;
    }
  }
});

export const mongoInit = () => {
  return async dispatch => {
    const counter = await mongoService.getCounter();
    dispatch(setCounter(counter));
  };
};

export const mongoIncrement = () => {
  return async dispatch => {
    const counter = await mongoService.incrementCounter();
    dispatch(setCounter(counter));
  };
};

export const mongoDecrement = () => {
  return async dispatch => {
    const counter = await mongoService.decrementCounter();
    dispatch(setCounter(counter));
  };
};

export const mongoReset = () => {
  return async dispatch => {
    const counter = await mongoService.resetCounter();
    dispatch(setCounter(counter));
  };
};

export const { setCounter } = mongoSlice.actions;
export default mongoSlice.reducer;