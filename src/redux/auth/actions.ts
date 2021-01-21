import { action } from 'typesafe-actions';
import { Constants } from './constants';

export function updateUser(payload: object) {
  return action(Constants.UPDATE_USER, payload);
}

export function updateWidgets(payload: [{}]) {
  return action(Constants.UPDATE_WIDGETS, payload);
}

export function updateWidgetsUser(payload: [{}]) {
  return action(Constants.UPDATE_WIDGETS_USER, payload);
}
