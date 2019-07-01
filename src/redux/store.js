import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { REDUX_DEBUGGING_ENABLED } from 'react-native-dotenv';

import rootReducer from './reducers';
import apiMiddleware from './apiMiddleware';

const middleWares = [thunkMiddleware, apiMiddleware];

function baselineMiddleware() {
  if (REDUX_DEBUGGING_ENABLED === 'true') {
    return compose(applyMiddleware(...middleWares, createLogger()));
  }

  return compose(applyMiddleware(...middleWares));
}

export default initialState => {
  const enhancers =
    REDUX_DEBUGGING_ENABLED === 'true'
      ? composeWithDevTools(baselineMiddleware())
      : baselineMiddleware();
  const store = createStore(rootReducer(), initialState, enhancers);
  return store;
};
