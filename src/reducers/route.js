import * as ActionType from '../constants/ActionType';

const initialState = {
  route: 'home',
  isCommenting: false,
  isSidebarOpen: false,
};

export default function route(state = initialState, action) {
  switch (action.type) {
    case ActionType.ROUTE_HOME:
      return {
        ...state,
        route: 'home',
      };
    case ActionType.ROUTE_DETAIL:
      return {
        ...state,
        route: 'detail',
      };
    case ActionType.ROUTE_ME:
      return {
        ...state,
        route: 'me',
      };
    case ActionType.ROUTE_SET_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.isSidebarOpen,
      };
    case ActionType.ROUTE_OPEN_COMMENT:
      return {
        ...state,
        isCommenting: true,
      };
    case ActionType.ROUTE_CLOSE_COMMENT:
      return {
        ...state,
        isCommenting: false,
      };
    default:
      return state;
  }
}
