import { Store, createStore, applyMiddleware, compose } from 'redux';
import { History } from 'history';
import { logger } from 'app/middleware';
import { RootState, rootReducer } from 'app/reducers';
import { routerMiddleware, connectRouter } from 'connected-react-router';

export function configureStore(history: History, initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger, routerMiddleware(history));

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeEnhancers(middleware);
  }

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState as any, 
    middleware
  ) as Store<RootState>;


  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      store.replaceReducer(connectRouter(history)(rootReducer))
    });
  }

  return store;
}
