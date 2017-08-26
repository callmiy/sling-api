// @flow
import { writeSession } from './../authManager';
import connectToSocket from './../actions/connectToSocket';
import authenticationSuccess from './../actions/authenticationSuccess';

export default (response: Object) => {
  writeSession(response.meta.token);
  return [
    authenticationSuccess(response),
    connectToSocket(response.data),
  ];
};
