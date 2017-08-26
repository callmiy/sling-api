import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'semantic-ui-css/semantic.min.css';
import './index.rxjs.operators';
import './index.css';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
registerServiceWorker();
