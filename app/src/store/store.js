import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from './storage.js';
import { migrations } from './migrations.js';
import rootReducer from '../reducers/rootReducer.js'; // this is the combineReducers that contain all the reducers.

const MIGRATION_DEBUG = false

const persistConfig = {
  key: 'root',
  version: 0,
  storage,
  migrate: createMigrate(migrations, {debug: MIGRATION_DEBUG})
}; // the config for redux-persist

const persistedReducer = persistReducer(persistConfig, rootReducer); // we create a persisted reducer with the persistConfig and the rootReducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
  devTools: process.env.NODE_ENV !== 'production'
}); // we create and export the redux store witch his data will persist from a refresh or a reload thank to the redux-persist

export const setupStore = preloadedState => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    preloadedState
  });
}; // this function can be used to create a store with preloadedState.

export const persistor = persistStore(store); // we create and export the persistor to enable the persist from any refresh or reload