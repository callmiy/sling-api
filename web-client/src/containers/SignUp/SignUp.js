// @flow
import React from 'react';
import Navbar from './../../components/Navbar';
import SignUpForm from './../../components/SignUpForm';
import { SIGNUP_FORM_NAME } from './../../constants';

export default (props: Object) => {
  const { history, signup, startSubmit } = props;

  return (
    <div>
      <Navbar />
      <SignUpForm onSubmit={(user) => {
        startSubmit(SIGNUP_FORM_NAME);
        signup(user, history);
      }}
      />
    </div>
  );
};
