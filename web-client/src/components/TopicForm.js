// @flow
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import { ROOM_TOPIC_FORM } from './../constants';
import { errorBorder, errorFontColor } from './renderServerError';

const styles = StyleSheet.create({
  input: {
    display: 'inline-block',
    marginLeft: '4px',
    width: '200px',
    padding: '2px',
    lineHeight: '1',
    fontSize: '12px',
    color: 'rgb(120,120,120)',
  },

  button: {
    cursor: 'pointer',
    background: '#fff',
    border: '0',
    padding: '3px 5px',
    marginLeft: '5px',
    borderRadius: '4px',
    ':hover': {
      boxShadow: '0 0  2px rgba(0,0,0,.25)',
    },
  },

  submitButton: {
    color: 'rgb(64,151,141)',
  },

  cancelButton: { color: 'rgb(255,59,48)' },

  error: {
    color: errorFontColor,
    cursor: 'none',
    ':hover': {
      boxShadow: `0 0  2px ${errorFontColor}`,
    },
  },
});

const TopicForm = (props: Object) => {
  const { handleSubmit, submitting, onCancel, error } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="topic"
        placeholder="Room topic"
        component="input"
        className={`form-control ${css(styles.input)}`}
        style={errorBorder(error, '')}
      />

      <button
        className={css(styles.button, styles.submitButton)}
        disabled={submitting}
        type="submit"
      >
        <span className="fa fa-check" />
      </button>
      <button
        className={css(styles.button, styles.cancelButton)}
        disabled={submitting}
        type="button"
        onClick={onCancel}
      >
        <span className="fa fa-ban" />
      </button>

      {error &&
        <span className={css(styles.button, styles.error)}>
          {error}
        </span>}
    </form>
  );
};

export default reduxForm({ form: ROOM_TOPIC_FORM })(TopicForm);
