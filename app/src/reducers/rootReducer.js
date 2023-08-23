import { combineReducers } from "@reduxjs/toolkit";
import authentificationReducer from "./authentification.js";
import accountsReducer from './accounts.js';
import notificationReducer from "./notification.js";
import configurationReducer from "./configuration.js";

const rootReducer = combineReducers({ // we combine the reducers into one.
  authentification: authentificationReducer,
  accounts: accountsReducer,
  notification: notificationReducer,
  configuration: configurationReducer
});

export default rootReducer;