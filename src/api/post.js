import _ from 'lodash';
import XHR from '../utils/xhr';
import {
  BASE_URL, API_POSTS, LOCAL_STORAGE_KEY, API_POST_DETAIL,
} from '../constants';

class PostService {
  static getPosts(query) {
    const queryParam = _.toPairs(query)
      .filter(q => !!q[1])
      .map(q => `${q[0]}=${encodeURIComponent(q[1])}`);
    const queryString = queryParam.length > 0 ? `?${queryParam.join('&')}` : '';

    let user;
    try {
      user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (e) {
      user = null;
    }

    const xhr = new XHR('GET', `${BASE_URL}${API_POSTS}${queryString}`);
    return xhr.sendRequest({ 'X-Token': user ? user.token : null }, {});
  }

  static getPostDetail() {
    let user;
    try {
      user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (e) {
      user = null;
    }

    const xhr = new XHR('GET', `${BASE_URL}${API_POST_DETAIL}`);
    return xhr.sendRequest({ 'X-Token': user ? user.token : null }, {});
  }
}

export default PostService;
