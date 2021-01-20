import { combineReducers, createStore } from 'redux';
import { authReducer } from './auth/reducer';
import { IAuthState } from './auth/types';

export interface IRootState {
  auth: IAuthState;
}
const store = createStore<IRootState, any, any, any>(
  combineReducers({
    auth: authReducer,
  }),
);
export default store;
