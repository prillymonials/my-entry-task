import * as ActionType from '../constants/ActionType';

const initialState = false;

export default function toast(state = initialState, action) {
  switch (action.type) {
    case ActionType.TOAST_SHOW:
      return true;
    case ActionType.TOAST_HIDE:
      return initialState;
    default:
      return state;
  }
}
