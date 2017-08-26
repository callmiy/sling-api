// @flow
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
 } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './../Home';
import Room from './../Room';
import Login from './../Login';
import SignUp from './../SignUp';
import AuthRequired from './../AuthRequired';
import {
  LOGIN_URL,
  ROOT_URL,
  SIGNUP_URL,
  ROOM_URL,
  BASE_NAME,
} from './../../constants';

export default class Root extends Component {
  componentDidMount() {
    const { shouldAuthenticate, refresh } = this.props;
    if (shouldAuthenticate) {
      refresh();
    }
  }

  props: Object

  render() {
    const {
      isAuthenticated,
      store,
      shouldAuthenticate,
    } = this.props;

    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <AuthRequired
              isAuthenticated={isAuthenticated}
              shouldAuthenticate={shouldAuthenticate}
              exact
              path={ROOT_URL}
              AuthComponent={Home}
            />

            <AuthRequired
              isAuthenticated={isAuthenticated}
              shouldAuthenticate={shouldAuthenticate}
              exacts
              path={ROOM_URL}
              AuthComponent={Room}
            />

            <Route exact path={LOGIN_URL} component={Login} />
            <Route exact path={SIGNUP_URL} component={SignUp} />
            <Route render={() => <Redirect to={LOGIN_URL} />} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
