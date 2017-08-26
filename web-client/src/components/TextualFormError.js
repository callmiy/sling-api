// @flow
import React from 'react';
import { Message } from 'semantic-ui-react';

const TextualFormError = (props: Object) => {
  const { error } = props;
  return typeof error === 'string'
    ? <Message
      error
      compact
      content={error}
    />
    : null;
};

export default TextualFormError;
