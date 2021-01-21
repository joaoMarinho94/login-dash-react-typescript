import {
  AuthState,
  AuthActionTypes,
  UPDATE_USER,
  UPDATE_WIDGETS,
  UPDATE_WIDGETS_USER,
  CLEAR_USER,
} from './types';

const init: AuthState = {
  user: {
    account: 0,
    active: 0,
    id: 0,
    token: '',
    username: '',
  },
  widgets: [
    {
      id: 0,
      title: '',
      description: '',
      created_at: '',
    },
  ],
  widgetsUser: [
    {
      id: 0,
      user_id: 0,
      style: '',
      created_at: '',
    },
  ],
};

export function authReducer(state = init, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case UPDATE_WIDGETS:
      return { ...state, widgets: action.payload };
    case UPDATE_WIDGETS_USER:
      return { ...state, widgetsUser: action.payload };
    case CLEAR_USER:
      return init;
    default:
      return state;
  }
}
