// @flow
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import { LOGIN_FORM_NAME } from './../constants';
import SignUpButton from './SignUpButton';
import renderField from './renderField';
import RenderSubmit from './RenderSubmit';
import TextualFormError from './TextualFormError';

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexFlow: 'column',
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '1rem auto',
  },
});

const LoginForm = (props: Object) => {
  const {
    handleSubmit,
    submitting,
    reset,
    pristine,
    error,
    invalid,
  } = props;

  return (
    <form onSubmit={handleSubmit} className={`card ${css(styles.card)}`}>

      <h3
        style={{
          marginBottom: '2rem',
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.48)' }}
      >
        Login
      </h3>

      <TextualFormError error={error} />

      <Field
        name="username"
        type="text"
        label="Username"
        component={renderField}
      />

      <br />

      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />

      <br />

      <RenderSubmit
        reset={reset}
        submitting={submitting}
        text="Login"
        pristine={pristine}
        invalid={invalid}
      />
      <hr />
      <SignUpButton />
    </form>
  );
};

const validate = ({ username, password }: Object) => {
  const errors = {};
  if (!username) {
    errors.username = 'Required';
  } else if (username.trim().length < 3) {
    errors.username = 'Must be at least 3 characters';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.trim().length < 3) {
    errors.password = 'Must be at least 3 characters';
  }

  return errors;
};

export default reduxForm({
  form: LOGIN_FORM_NAME,
  validate,
})(LoginForm);
