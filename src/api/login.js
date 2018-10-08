import XHR from '../utils/xhr';
import { BASE_URL, API_LOGIN } from '../constants';

class LoginService {
  static login(body) {
    const xhr = new XHR('POST', `${BASE_URL}${API_LOGIN}`);
    return xhr.sendRequest({}, body);
  }
}

export default LoginService;
