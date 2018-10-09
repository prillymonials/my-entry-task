import { combineReducers } from 'redux';
import auth from './auth';
import toast from './toast';
import post from './post';
import route from './route';
import search from './search';
import myPost from './myPost';

const reducers = combineReducers({
  auth,
  toast,
  post,
  route,
  search,
  myPost,
});

export default reducers;
