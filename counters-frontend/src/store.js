import { configureStore } from '@reduxjs/toolkit';

import reactReducer from './reducers/reactReducer';
import cookieReducer from './reducers/cookieReducer';
import nodeReducer from './reducers/nodeReducer';
import redisReducer from './reducers/redisReducer';
import mongoReducer from './reducers/mongoReducer';
import envReducer from './reducers/infoReducer';

const store = configureStore({
  reducer: {
    reactCounter: reactReducer,
    cookieCounter: cookieReducer,
    nodeCounter: nodeReducer,
    redisCounter: redisReducer,
    mongoCounter: mongoReducer,
    env: envReducer
  }
});

export default store;