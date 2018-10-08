import { toPairs } from 'lodash';

class XHR {
  constructor(method, url) {
    this.xhr = new XMLHttpRequest();

    if (!method) {
      throw new Error('Method parameter is required.');
    }
    if (!url) {
      throw new Error('URL parameter is required.');
    }

    this.method = method;
    this.url = url;
  }

  sendRequest(headers, body) {
    return new Promise((resolve, reject) => {
      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState === this.xhr.DONE) {
          if (this.xhr.status === 200) {
            try {
              resolve(JSON.parse(this.xhr.responseText));
            } catch (error) {
              reject(error);
            }
          } else if (this.xhr.status) {
            try {
              reject(JSON.parse(this.xhr.responseText));
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error('An error occured while sending the request.'));
          }
        }
      };
      this.xhr.open(this.method, this.url);
      toPairs(headers).forEach(header => this.xhr.setRequestHeader(header[0], header[1]));
      this.xhr.send(JSON.stringify(body));
    });
  }
}

export default XHR;
