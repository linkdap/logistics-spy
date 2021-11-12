import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { LoggingMiddleware } from '@chr/common-javascript-logging-redux-middleware'

export const createStore = (config, authClient, ajaxClient) => {

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      ajaxClient,
      authClient,
      ...config
    }
  });

  const rootReducer = combineReducers({
    // put all your area and common reducers here
    // this is a filler to make redux happy that there is *something* in your state atom
    replace_me_before_doing_anything_at_all: () => null
  })

  const rootEpic = combineEpics(
    // put all your area and common epics here
  );

  const middlewares = process.env.NODE_ENV === 'production'
    ? [epicMiddleware, LoggingMiddleware]
    : [epicMiddleware, LoggingMiddleware, createLogger()];

  const store = createReduxStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

  epicMiddleware.run(rootEpic);

  return store;
}
