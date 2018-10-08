import * as ActionType from '../constants/ActionType';

const initialState = {
  page: 0,
  isLoading: false,
  isLastItem: false,
  currentPost: null,
  postError: null,
  toastMessage: null,
  data: [],
  total: 0,
};

export default function post(state = initialState, action) {
  switch (action.type) {
    case ActionType.POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        postError: null,
      };
    case ActionType.POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        page: action.page,
        isLastItem: action.isLastItem,
        data: [...state.data, ...action.data],
        total: action.total,
      };
    case ActionType.POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLastItem: true,
        postError: action.error,
      };
    case ActionType.POST_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        currentPost: null,
        data: [],
        toastMessage: null,
      };
    case ActionType.POST_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentPost: action.post,
        data: action.data,
      };
    case ActionType.POST_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        postError: action.error,
        data: action.data,
      };
    case ActionType.POST_ADD_COMMENT:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: [...state.currentPost.comments, action.comment],
        },
        toastMessage: action.toastMessage,
      };
    case ActionType.POST_SET_GOING:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          isUserGoing: action.isUserGoing,
        },
        toastMessage: action.toastMessage,
      };
    case ActionType.POST_SET_LIKE:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          isUserLike: action.isUserLike,
        },
        toastMessage: action.toastMessage,
      };
    case ActionType.POST_CLEAR:
      return initialState;
    default:
      return state;
  }
}
