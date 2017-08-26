// @flow
export const handlePromiseRejection = (error: Object, cb: void | () => mixed) => {
  if (cb) {
    cb();
  }
  if (error.response) {
    console.log(
      '\n\nlogging starts:\n\n', 'error.response',
      error.response,
      '\n\nlogging ends\n\n',
    );
  } else {
    console.log(
      '\n\nlogging starts:\n\n',
      'plain error is', error,
      '\n\nlogging ends\n\n',
    );
  }
};
