import { action } from 'typesafe-actions';
import {
  Widgets,
  WidgetsUser,
  User,
  UPDATE_USER,
  UPDATE_WIDGETS_USER,
  CLEAR_USER,
  UPDATE_WIDGETS,
  AuthActionTypes,
} from './types';

export function updateUser(payload: User): AuthActionTypes {
  return action(UPDATE_USER, payload);
}

export function updateWidgets(payload: Widgets[]): AuthActionTypes {
  return action(UPDATE_WIDGETS, payload);
}

export function updateWidgetsUser(payload: WidgetsUser[]): AuthActionTypes {
  return action(UPDATE_WIDGETS_USER, payload);
}

export function clearUser(): AuthActionTypes {
  return action(CLEAR_USER);
}
