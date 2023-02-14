import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  frontend: 'wait',
  backend: 'wait',
  ip: 'wait',
  version: 'wait'
};

const envSlice = createSlice({
  name: 'env',
  initialState,
  reducers: {
    printBackend(state, action) {
      return {
        ...state,
        backend: action.payload.backend
      };
    },
    printFrontend(state, action) {
      return {
        ...state,
        frontend: action.payload.frontend
      };
    },
    printIp(state, action) {
      return {
        ...state,
        ip: action.payload.ip
      };
    },
    printVersion(state, action) {
      return {
        ...state,
        version: action.payload.version
      };
    }
  }
});

export const getBackend = () => {
  return async dispatch => {
    const response = await axios
      .get('/api/env')
      .then(res => res.data);
    dispatch(printBackend({ backend: response }));
  };
};

export const getFrontend = () => {
  return async dispatch => {
    dispatch(printFrontend({ frontend: process.env.NODE_ENV }));
  };
};

export const getIp = () => {
  return async dispatch => {
    const response = await axios
      .get('/api/ip')
      .then(res => res.data);
    dispatch(printIp({ ip: response }));
  };
};

export const getVersion = () => {
  return async dispatch => {
    const response = await axios
      .get('/api/version')
      .then(res => res.data);
    dispatch(printVersion({ version: response }));
  };
};


export const { printBackend, printFrontend, printIp, printVersion } = envSlice.actions;
export default envSlice.reducer;