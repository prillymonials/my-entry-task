import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './containers/App';
import reducers from './reducers';
import mockRequest from './utils/mock';

let enhancer;

if (process.env.NODE_ENV !== 'production') {
  mockRequest();
  // eslint-disable-next-line
  const { logger, devTools } = require('./utils/devUtils').default;
  enhancer = devTools(applyMiddleware(thunk, logger));
} else {
  enhancer = applyMiddleware(thunk);
}

const store = createStore(reducers, enhancer);

const render = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(render, document.getElementById('root'));
