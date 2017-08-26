// @flow
import { CONNECTION_ERROR_TEXT } from './../constants';

export default (error: Object): string | Object => {
  if (error.xhr.response) {
    return error.xhr.response.errors;
  } else if (error.status === 0) {
    return CONNECTION_ERROR_TEXT;
  } else if (error.status < 500) {
    return 'Request can not be fulfilled at this time!';
  }
  throw new Error(error);
};

