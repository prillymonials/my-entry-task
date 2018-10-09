import * as ActionType from '../constants/ActionType';

const initialState = {
  tab: 'like',
  isLoading: false,
  like: {
    page: 0,
    data: [],
    total: 0,
    isLastItem: false,
  },
  going: {
    page: 0,
    data: [],
    total: 0,
    isLastItem: false,
  },
  past: {
    page: 0,
    data: [],
    total: 0,
    isLastItem: false,
  },
};

export default function myPost(state = initialState, action) {
  switch (action.type) {
    case ActionType.MY_POST_SET_TAB:
      return {
        ...state,
        tab: action.tab,
      };
    case ActionType.MY_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        tab: action.tab,
      };
    case ActionType.MY_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.tab]: {
          page: action.page,
          data: [...state[action.tab].data, ...action.data],
          total: action.total,
          isLastItem: action.isLastItem,
        },
      };
    case ActionType.MY_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
