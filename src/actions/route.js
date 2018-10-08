import * as ActionType from '../constants/ActionType';

export const goToHome = () => ({ type: ActionType.ROUTE_HOME });
export const goToPostDetail = () => ({ type: ActionType.ROUTE_DETAIL });
export const goToMe = () => ({ type: ActionType.ROUTE_ME });
export const setSidebar = isSidebarOpen => ({ type: ActionType.ROUTE_SET_SIDEBAR, isSidebarOpen });
export const openComment = () => ({ type: ActionType.ROUTE_OPEN_COMMENT });
export const closeComment = () => ({ type: ActionType.ROUTE_CLOSE_COMMENT });

export const openCommentWithCallback = callback => (dispatch) => {
  dispatch(openComment());
  setTimeout(callback, 1);
};
