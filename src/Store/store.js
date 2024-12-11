import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from  './slices/user.slice'
import recentDataReducer from './slices/getRecentData.slice'

const rootReducer = combineReducers({
    user: userReducer,
    getRecentData : recentDataReducer

  });
  const rootReducers = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined; // Reset the entire state
    }
    return rootReducer(state, action);
};
  
  export const store = configureStore({
    reducer: rootReducers,
    // middleware: [socketMiddleware]
  });
  export const resetStore = () => ({ type: 'RESET_STORE' });
