// @flow
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { css } from 'aphrodite';
import { Input, Button } from 'semantic-ui-react';
import { NEW_ROOM_FORM_NAME } from './../constants';
import {
  errorStyleClass,
  errorStyle,
} from './renderServerError';
import styles from './../styles/smallDevicesInlineFormStyles';

const render = (props: Object) => {
  const {
    formInvalid,
    reset,
    input,
    meta: { error, submitting, pristine, invalid },
  } = props;

  const hasError = (!pristine && invalid);

  return (
    <div>
      <Input
        action
        {...input}
        error={hasError}
        placeholder="Name"
        autoComplete="off"
        className={css(styles.Input)}
      >

        <input style={{ flex: '1', ...errorStyle(hasError) }} />

        <Button.Group className={css(styles.buttons)}>
          <Button
            positive
            loading={submitting}
            type="submit"
            disabled={pristine || invalid || formInvalid || submitting}
          >
            {submitting ? '' : 'Save'}
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


const NewRoomForm = (props: Object) => {
  const {
    handleSubmit,

    reset,
    invalid,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={render}
        reset={reset}
        formInvalid={invalid}

      />
    </form>
  );
};

const validate = ({ name }: Object) => {
  const errors = {};
  if (!name) {
    errors.name = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: NEW_ROOM_FORM_NAME,
  validate,
})(NewRoomForm);
