import _ from 'lodash';
import XHR from '../utils/xhr';
import {
  BASE_URL,
  API_POSTS,
  LOCAL_STORAGE_KEY,
  API_POST_DETAIL,
  API_POST_GOING_ME,
  API_POST_LIKE_ME,
  API_POST_PAST_ME,
} from '../constants';

class PostService {
  static getUserToken() {
    let user;
    try {
      user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (e) {
      user = null;
    }

    return user ? user.token : null;
  }

  static getPosts(query) {
    const queryParam = _.toPairs(query)
      .filter(q => !!q[1])
      .map(q => `${q[0]}=${encodeURIComponent(q[1])}`);
    const queryString = queryParam.length > 0 ? `?${queryParam.join('&')}` : '';

    const xhr = new XHR('GET', `${BASE_URL}${API_POSTS}${queryString}`);
    return xhr.sendRequest({ 'X-Token': this.getUserToken() }, {});
  }

  static getPostDetail() {
    const xhr = new XHR('GET', `${BASE_URL}${API_POST_DETAIL}`);
    return xhr.sendRequest({ 'X-Token': this.getUserToken() }, {});
  }

  static getMyPostGoing(page) {
    const xhr = new XHR('GET', `${BASE_URL}${API_POST_GOING_ME}?page=${page}`);
    return xhr.sendRequest({ 'X-Token': this.getUserToken() }, {});
  }

  static getMyPostLike(page) {
    const xhr = new XHR('GET', `${BASE_URL}${API_POST_LIKE_ME}?page=${page}`);
    return xhr.sendRequest({ 'X-Token': this.getUserToken() }, {});
  }

  static getMyPostPast(page) {
    const xhr = new XHR('GET', `${BASE_URL}${API_POST_PAST_ME}?page=${page}`);
    return xhr.sendRequest({ 'X-Token': this.getUserToken() }, {});
  }
}

export default PostService;
