import mock, { proxy, delay } from 'xhr-mock';
import * as C from '../constants';
import loginCallback from './mock/login';
import postCallback from './mock/post';
import postDetailCallback from './mock/postDetail';
import channelCallback from './mock/channel';

export default () => {
  mock.setup();

  mock.post(C.API_LOGIN, delay(loginCallback, 800));
  mock.get(new RegExp(`${C.API_POSTS}.*`), delay(postCallback, 1500));
  mock.get(C.API_POST_DETAIL, delay(postDetailCallback, 800));
  mock.get(C.API_CHANNELS, delay(channelCallback, 800));

  mock.use(proxy);
};
