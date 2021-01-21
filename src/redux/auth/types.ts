export interface WidgetsUser {
  id: number;
  user_id: number;
  style: string;
  created_at: string;
}

export interface Widgets {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export interface User {
  account: number;
  active: number;
  id: number;
  token: string;
  username: string;
}

export interface AuthState {
  user: User;
  widgets: Widgets[];
  widgetsUser: WidgetsUser[];
}

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_WIDGETS = 'UPDATE_WIDGETS';
export const UPDATE_WIDGETS_USER = 'UPDATE_WIDGETS_USER';
export const CLEAR_USER = 'CLEAR_USER';

interface UpdateUser {
  type: typeof UPDATE_USER;
  payload: User;
}

interface UpdateWidgets {
  type: typeof UPDATE_WIDGETS;
  payload: Widgets[];
}
interface UpdateWidgetsUser {
  type: typeof UPDATE_WIDGETS_USER;
  payload: WidgetsUser[];
}

interface ClearUser {
  type: typeof CLEAR_USER;
}

export type AuthActionTypes =
  | UpdateUser
  | UpdateWidgets
  | UpdateWidgetsUser
  | ClearUser;
