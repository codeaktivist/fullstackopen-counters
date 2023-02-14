import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const reactSlice = createSlice({
  name: 'react',
  initialState,
  reducers: {
    setCounter(state, action) {
      return action.payload;
    }
  }
});

export const { setCounter } = reactSlice.actions;
export default reactSlice.reducer;