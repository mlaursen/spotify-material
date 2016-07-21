import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk/*, logger()*/)
  );

  if(module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
