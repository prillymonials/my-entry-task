import * as ActionType from '../constants/ActionType';
import PostService from '../api/post';

export const myPostRequest = tab => ({ type: ActionType.MY_POST_REQUEST, tab });
export const myPostSuccess = (tab, page, data, isLastItem, total) => ({
  type: ActionType.MY_POST_SUCCESS,
  tab,
  page,
  data,
  isLastItem,
  total,
});
export const myPostFailure = () => ({ type: ActionType.MY_POST_FAILURE });
export const myPostSetTab = tab => ({ type: ActionType.MY_POST_SET_TAB, tab });

export const onMyPostRequest = (tab, addEventListener) => (dispatch, getState) => {
  dispatch(myPostRequest(tab));

  const page = getState().myPost[tab].page + 1;
  let service;

  if (tab === 'going') {
    service = PostService.getMyPostGoing(page);
  } else if (tab === 'like') {
    service = PostService.getMyPostLike(page);
  } else if (tab === 'past') {
    service = PostService.getMyPostPast(page);
  }

  if (service) {
    service
      .then((response) => {
        dispatch(
          myPostSuccess(tab, page, response.posts, response.posts.length === 0, response.total),
        );
        if (addEventListener) {
          addEventListener();
        }
      })
      .catch(error => dispatch(myPostFailure(error.error)));
  }
};
