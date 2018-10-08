import * as ActionType from '../constants/ActionType';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  loginError: null,
  user: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loginError: null,
      };

    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.user,
      };

    case ActionType.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        loginError: action.error,
      };

    case ActionType.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
