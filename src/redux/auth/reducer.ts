import { IAuthState, AuthActions } from './types';
import { Constants } from './constants';

const init: IAuthState = {
  user: {},
  widgets: [{}],
  widgetsUser: [{}],
};

export function authReducer(
  state: IAuthState = init,
  action: AuthActions,
): IAuthState {
  switch (action.type) {
    case Constants.UPDATE_USER:
      return { ...state, user: action.payload };
    case Constants.UPDATE_WIDGETS:
      return { ...state, widgets: action.payload };
    case Constants.UPDATE_WIDGETS_USER:
      return { ...state, widgetsUser: action.payload };
    default:
      return state;
  }
}
