import React from 'react';
import { Link } from 'react-router-dom';
import { SIGNUP_URL } from './../constants';

const SignUpButton = () => (
  <Link to={SIGNUP_URL} className="btn btn-default btn-block btn-secondary">
    Create an account
  </Link>
);

export default SignUpButton;
