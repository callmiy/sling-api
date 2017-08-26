// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Button } from 'semantic-ui-react';
import { css } from 'aphrodite';
import { NEW_MESSAGE_FORM } from './../constants';
import { errorStyleClass, errorStyle } from './renderServerError';
import styles from './../styles/smallDevicesInlineFormStyles';

const render = (props: Object) => {
  const {
       input,
       serverErrors,
       reset,
       meta: { error, submitting, pristine, invalid },
  } = props;

  const hasError = (!pristine && invalid) ||
  (serverErrors && !!serverErrors[input.name]);

  return (
    <div>
      <Input
        {...input}
        type="text"
        autoComplete="off"
        className={css(styles.Input)}
      >

        <input
          style={{ flex: '1', ...errorStyle(hasError) }}
          placeholder="Type your message"
        />

        <Button.Group className={css(styles.buttons)}>
          <Button
            positive
            type="submit"
            disabled={pristine || submitting}
          >
            Send
          </Button>

          <Button.Or />

          <Button
            basic
            color="yellow"
            disabled={pristine || submitting}
            onClick={reset}
          >
              Reset
            </Button>
        </Button.Group>
      </Input>
      {hasError &&
        <div className={errorStyleClass}>
          {error}
        </div>
      }
    </div>
  );
};

const MessageForm = (props: Object) => {
  const { handleSubmit, submitting, reset } = props;

  return (
    <form onSubmit={handleSubmit} style={{ padding: '5px' }}>
      <Field
        name="text"
        submitting={submitting}
        reset={reset}
        component={render}
      />
    </form>
  );
};

const validate = ({ text }: Object) => {
  const errors = {};

  if (!text) {
    errors.text = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: NEW_MESSAGE_FORM,
  validate,
})(MessageForm);
