// @flow
import { connect } from 'react-redux';
import Root from './Root';
import {
  getIsAuthenticated,
  getShouldAuthenticate,
 } from './../../reducers';
import { refresh } from './../../actions/refresh';

export default connect(
  (state) => ({
    isAuthenticated: getIsAuthenticated(state),
    shouldAuthenticate: getShouldAuthenticate(state),
  }),
  { refresh },
)(Root);
