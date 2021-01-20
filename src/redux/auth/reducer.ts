import { IAuthState, AuthActions } from './types';
import { Constants } from './constants';

const init: IAuthState = {
  user: {},
};

export function authReducer(
  state: IAuthState = init,
  action: AuthActions,
): IAuthState {
  switch (action.type) {
    case Constants.UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
