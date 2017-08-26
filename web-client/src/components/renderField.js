// @flow
import React from 'react';
import { Input } from 'semantic-ui-react';
import { errorStyleClass } from './renderServerError';

const renderField = ({
  input,
  label,
  type,
  serverErrors,
  meta: { error, pristine, invalid },
}: Object) => {
  const hasError = (!pristine && invalid) ||
  (serverErrors && !!serverErrors[input.name]);

  return (
    <div style={{ flex: '1' }}>
      <Input
        fluid
        {...input}
        error={hasError}
        placeholder={label}
        type={type}
      />
      {hasError &&
        <div className={errorStyleClass}>
          {error}
        </div>
      }
    </div>
  );
};

export default renderField;
