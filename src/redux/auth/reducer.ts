import { IAuthState, AuthActions } from './types';
import { Constants } from './constants';

const init: IAuthState = {
  list: [],
};

export function authReducer(
  state: IAuthState = init,
  action: AuthActions,
): IAuthState {
  switch (action.type) {
    case Constants.ADD_ITEM:
      return { list: [...state.list, action.payload.item] };
    default:
      return state;
  }
}
