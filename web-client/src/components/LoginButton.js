import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_URL } from './../constants';

const LoginButton = () => (
  <Link
    to={LOGIN_URL}
    className="btn btn-default btn-block btn-secondary"
  >
    Login to your account
  </Link>
);

export default LoginButton;
