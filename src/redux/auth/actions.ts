import { action } from 'typesafe-actions';
import { Constants } from './constants';

export function addItemToList(item: string) {
  return action(Constants.ADD_ITEM, {
    item,
  });
}
