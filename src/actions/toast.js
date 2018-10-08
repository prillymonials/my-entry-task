import * as ActionType from '../constants/ActionType';

export const toastShow = () => ({ type: ActionType.TOAST_SHOW });
export const toastHide = () => ({ type: ActionType.TOAST_HIDE });

export const handleToast = () => (dispatch) => {
  dispatch(toastShow());
  setTimeout(() => dispatch(toastHide()), 2900);
};
