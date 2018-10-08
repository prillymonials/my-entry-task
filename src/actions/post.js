import * as ActionType from '../constants/ActionType';
import PostService from '../api/post';

export const postRequest = () => ({ type: ActionType.POST_REQUEST });
export const postSuccess = (isLastItem, page, data, total) => ({
  type: ActionType.POST_SUCCESS,
  isLastItem,
  page,
  data,
  total,
});
export const postFailure = error => ({ type: ActionType.POST_FAILURE, error });
export const postClear = () => ({ type: ActionType.POST_CLEAR });
export const postDetailRequest = () => ({ type: ActionType.POST_DETAIL_REQUEST });
export const postDetailSuccess = (post, data) => ({
  type: ActionType.POST_DETAIL_SUCCESS,
  post,
  data,
});
export const postDetailFailure = (error, data) => ({
  type: ActionType.POST_DETAIL_REQUEST,
  error,
  data,
});
export const postAddComment = (comment, toastMessage) => ({
  type: ActionType.POST_ADD_COMMENT,
  comment,
  toastMessage,
});
export const postSetGoing = (isUserGoing, toastMessage) => ({
  type: ActionType.POST_SET_GOING,
  isUserGoing,
  toastMessage,
});
export const postSetLike = (isUserLike, toastMessage) => ({
  type: ActionType.POST_SET_LIKE,
  isUserLike,
  toastMessage,
});

export const onRequest = addEventListener => (dispatch, getState) => {
  dispatch(postRequest());

  const page = getState().post.page + 1;
  const { startAt, endAt, channelName } = getState().search;

  PostService.getPosts({
    page,
    start_at: startAt,
    end_at: endAt,
    channel_name: channelName,
  })
    .then((response) => {
      dispatch(postSuccess(response.posts.length === 0, page, response.posts, response.total));
      if (addEventListener) {
        addEventListener();
      }
    })
    .catch(error => dispatch(postFailure(error.error)));
};

export const onRequestDetail = (currentPost, callback) => (dispatch, getState) => {
  const { data } = getState().post;
  dispatch(postDetailRequest());

  PostService.getPostDetail()
    .then((response) => {
      dispatch(
        postDetailSuccess(
          {
            ...currentPost,
            ...response.post,
          },
          data,
        ),
      );
      callback();
    })
    .catch(error => dispatch(postDetailFailure(error.error, data)));
};
