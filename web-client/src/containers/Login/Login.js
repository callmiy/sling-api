// @flow
import React from 'react';
import LoginForm from './../../components/LoginForm';
import Navbar from './../../components/Navbar';
import { LOGIN_FORM_NAME } from './../../constants';

type propType = {
  login: (...any) => void,
  startSubmit: (string) => void,
  history: Object,
}

const Login = (props: propType) => {
  const { login, history, startSubmit } = props;

  return (
    <div>
      <Navbar />
      <LoginForm onSubmit={(user) => {
        startSubmit(LOGIN_FORM_NAME);
        login(user, history);
      }}
      />
    </div>
  );
};

export default Login;
