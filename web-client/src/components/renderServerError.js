// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';

export const errorFontColor = '#9f3a38';

const styles = StyleSheet.create({
  error: {
    color: errorFontColor,
    margin: '8px 0 0 0',
    fontWeight: '500',
  },
});

export const errorStyleClass = css(styles.error);

export const errorStyle = (hasError: boolean) => {
  if (hasError) {
    return {
      backgroundColor: '#fff6f6',
      borderColor: '#e0b4b4',
      color: errorFontColor,
    };
  }
  return {};
};

const renderServerError = (error: Object, name: string) => {
  if (!error || !error[name]) {
    return null;
  }

  const errors = error[name];

  if (typeof errors.map === 'function') {
    return (
      <div>
        <div className={errorStyleClass}>
          {`${name[0].toUpperCase() + name.slice(1)}: ${errors[0]}`}
        </div>

        {errors.slice(1).map((e) => (
          <div className={errorStyleClass} key={e}> {e} </div>
        ))}
      </div>
    );
  }

  return <div className={errorStyleClass} > {errors} </div>;
};

export default renderServerError;

export const errorBorder = (error: Object, name: string) => {
  if (error && (error[name] || !name)) {
    return { border: `2px solid ${errorFontColor}` };
  }

  return {};
};
