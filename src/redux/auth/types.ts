import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AuthActions = ActionType<typeof actions>;

export interface IAuthState {
  user: {};
}
