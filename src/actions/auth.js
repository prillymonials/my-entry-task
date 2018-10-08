import * as ActionType from '../constants/ActionType';
import LoginService from '../api/login';
import { LOCAL_STORAGE_KEY } from '../constants';

export const loginRequest = () => ({ type: ActionType.LOGIN_REQUEST });
export const loginFailure = error => ({ type: ActionType.LOGIN_FAILURE, error });
export const loginSuccess = user => ({ type: ActionType.LOGIN_SUCCESS, user });
export const logout = () => ({ type: ActionType.LOGOUT });

export const doLogin = (payload, triggerToast) => (dispatch) => {
  dispatch(loginRequest());
  LoginService.login(payload)
    .then((response) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response));
      dispatch(loginSuccess(response));
    })
    .catch((e) => {
      dispatch(loginFailure(e.error));
      triggerToast();
    });
};

export const doLogout = () => (dispatch) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  dispatch(logout());
};
