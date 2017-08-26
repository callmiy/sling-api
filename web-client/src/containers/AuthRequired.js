// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  LOGIN_URL,
} from './../constants';

type propType = {
  isAuthenticated: boolean,
  shouldAuthenticate: boolean,
  AuthComponent: Object,
  rest?: Object,
}
const AuthRequired = (props: propType) => {
  const {
    isAuthenticated,
    AuthComponent,
    shouldAuthenticate,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(childProps) => {
        if (isAuthenticated) {
          return (
            <AuthComponent
              {...childProps}
              isAuthenticated={isAuthenticated}
            />
          );
        }

        if (shouldAuthenticate) {
          return null;
        }

        return <Redirect to={LOGIN_URL} {...childProps} />;
      }}
    />
  );
};

AuthRequired.defaultProps = {
  rest: {},
};

export default AuthRequired;
