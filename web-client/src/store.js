// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import {
  composeWithDevTools,
} from 'redux-devtools-extension/logOnlyInProduction';
import { ajax } from 'rxjs/observable/dom/ajax';
import logger from 'redux-logger';
import type { Observable } from 'rxjs';
import reducers from './reducers';
import rootEpic from './epics';

export type EpicDependencies = {
  ajax: (string | Object) => Observable<*>
}

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { ajax },
});

const middlewares = [
  epicMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const composeEnhancers = composeWithDevTools({

});

export default () =>
  createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
);
