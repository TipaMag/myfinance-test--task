import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-reducer'
import dataSlice from './data-reducer'

const combinedReducer = combineReducers({
  auth: authSlice,
  data: dataSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // serializableCheck: false,
  }),
  devTools: window.location.hostname === 'localhost'
});