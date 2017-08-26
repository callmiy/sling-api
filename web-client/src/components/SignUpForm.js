// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { reduxForm, Field } from 'redux-form';
import { SIGNUP_FORM_NAME } from './../constants';
import renderField from './renderField';
import LoginButton from './LoginButton';
import RenderSubmit from './RenderSubmit';
import renderServerError from './renderServerError';
import TextualFormError from './TextualFormError';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

const SingupForm = (props: Object) => {
  const {
    handleSubmit,
    submitting,
    pristine,
    reset,
    error,
    invalid,
   } = props;

  return (
    <form onSubmit={handleSubmit} className={`card ${css(styles.card)}`}>
      <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Create an account
      </h3>

      <TextualFormError error={error} />

      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
        serverErrors={error}
      />
      {renderServerError(error, 'username')}

      <br />

      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        serverErrors={error}
      />
      {renderServerError(error, 'email')}

      <br />

      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        serverErrors={error}
      />

      <br />

      <Field
        name="password_confirmation"
        type="password"
        component={renderField}
        label="Password Confirmation"
      />

      <br />

      <RenderSubmit
        reset={reset}
        submitting={submitting}
        text="Sign Up"
        pristine={pristine}
        invalid={invalid}
      />

      <hr />
      <LoginButton />
    </form>
  );
};

const validate = ({ username, email, password }: Object) => {
  const errors = {};

  if (!username) {
    errors.username = 'Required';
  }

  if (!email) {
    errors.email = 'Required';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.trim().length < 6) {
    errors.password = 'Must be at least 6 characters';
  }

  return errors;
};

export default reduxForm({
  form: SIGNUP_FORM_NAME, validate,
})(SingupForm);
