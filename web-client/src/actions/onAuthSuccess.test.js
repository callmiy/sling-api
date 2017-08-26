// @flow
import onAuthSuccess from './onAuthSuccess';
import * as authManager from './../authManager';
import connectToSocket from './../actions/connectToSocket';
import authenticationSuccess from './../actions/authenticationSuccess';

test('onAuthSuccess', () => {
  const writeSession = jest.spyOn(authManager, 'writeSession');
  const response = {
    meta: {
      token: '1',
    },
    data: {
      id: '1',
    },
  };

  expect(onAuthSuccess(response)).toEqual([
    authenticationSuccess(response),
    connectToSocket(),
  ]);

  expect(writeSession).toHaveBeenCalledWith(response.meta.token);
});
