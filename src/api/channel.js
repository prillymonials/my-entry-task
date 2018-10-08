import XHR from '../utils/xhr';
import { BASE_URL, API_CHANNELS, LOCAL_STORAGE_KEY } from '../constants';

class ChannelService {
  static getList() {
    const xhr = new XHR('GET', `${BASE_URL}${API_CHANNELS}`);
    return xhr.sendRequest({ 'X-Token': localStorage.getItem(LOCAL_STORAGE_KEY) }, {});
  }
}

export default ChannelService;
