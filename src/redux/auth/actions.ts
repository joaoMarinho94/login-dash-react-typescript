import { action } from 'typesafe-actions';
import { Constants } from './constants';

export function updateUser(payload: object) {
  return action(Constants.UPDATE_USER, payload);
}
