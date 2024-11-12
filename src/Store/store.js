import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from  './slices/user.slice'
import recentDataReducer from './slices/getRecentData.slice'

const rootReducer = combineReducers({
    user: userReducer,
    getRecentData : recentDataReducer

  });
  
  export const store = configureStore({
    reducer: rootReducer,
    // middleware: [socketMiddleware]
  });

