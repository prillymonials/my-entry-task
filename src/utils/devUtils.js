/* eslint-disable import/no-extraneous-dependencies */
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
/* eslint-enable */

export default {
  logger: createLogger(),
  devTools: composeWithDevTools,
};
