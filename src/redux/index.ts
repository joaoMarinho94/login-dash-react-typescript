import { combineReducers, createStore } from 'redux';

import { authReducer } from './auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
