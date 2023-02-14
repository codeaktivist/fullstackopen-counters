import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    setCounter(state, action) {
      return action.payload;
    }
  }
});

export const cookieInit = () => {
  return async dispatch => {
    const counter = window.localStorage.getItem('cookieCounter') || window.localStorage.setItem('cookieCounter', initialState) || initialState;
    dispatch(setCounter(Number(counter)));
  };
};

export const cookieIncrement = () => {
  return async dispatch => {
    const counter = window.localStorage.getItem('cookieCounter');
    window.localStorage.setItem('cookieCounter', Number(counter) + 1);
    dispatch(setCounter(Number(counter) + 1));
  };
};

export const cookieDecrement = () => {
  return async dispatch => {
    const counter = window.localStorage.getItem('cookieCounter');
    window.localStorage.setItem('cookieCounter', Number(counter) - 1);
    dispatch(setCounter(Number(counter) - 1));
  };
};

export const cookieReset = () => {
  return async dispatch => {
    window.localStorage.setItem('cookieCounter', initialState);
    dispatch(setCounter(initialState));
  };
};

export const { setCounter } = cookieSlice.actions;
export default cookieSlice.reducer;