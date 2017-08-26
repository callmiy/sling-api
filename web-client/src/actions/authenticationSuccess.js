// @flow
import { AUTHENTICATION_SUCCESS } from './../constants';

const authenticationSuccess = (response: Object) => ({
  response,
  type: AUTHENTICATION_SUCCESS,
});

export default authenticationSuccess;
