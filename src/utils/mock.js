import mock, { proxy, delay } from 'xhr-mock';
import * as C from '../constants';
import loginCallback from './mock/login';
import postCallback from './mock/post';
import postDetailCallback from './mock/postDetail';
import channelCallback from './mock/channel';
import postGoingCallback from './mock/postGoing';
import postLikeCallback from './mock/postLike';
import postPastCallback from './mock/postPast';

export default () => {
  mock.setup();

  mock.post(C.API_LOGIN, delay(loginCallback, 800));
  mock.get(new RegExp(`${C.API_POSTS}.*`), delay(postCallback, 1000));
  mock.get(C.API_POST_DETAIL, delay(postDetailCallback, 800));
  mock.get(C.API_CHANNELS, delay(channelCallback, 800));
  mock.get(new RegExp(`${C.API_POST_GOING_ME}.*`), delay(postGoingCallback, 1000));
  mock.get(new RegExp(`${C.API_POST_LIKE_ME}.*`), delay(postLikeCallback, 1000));
  mock.get(new RegExp(`${C.API_POST_PAST_ME}.*`), delay(postPastCallback, 1000));

  mock.use(proxy);
};
