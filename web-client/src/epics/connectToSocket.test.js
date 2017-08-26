// @flow
// import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import * as phoenix from 'phoenix';
import connectToSocket from './connectToSocket';
import {
  CONNECT_TO_SOCKET,
  SOCKET_CONNECTED,
  // WEBSOCKET_ERROR,
} from './../constants';

describe('connectToSocket Epic', () => {
  const action$ = ActionsObservable.of({ type: CONNECT_TO_SOCKET });

  const error = {};

  const Socket = jest.spyOn(phoenix, 'Socket')
    .mockImplementation(() => ({
      connect() { },

      onOpen(cb) { cb(); },

      onError(cb) {
        cb(error);
      },

      disconnect() { },
    }));

  afterEach(() => {
    expect(Socket).toHaveBeenCalledTimes(2);
  });

  it('connects to socket', () => {
    connectToSocket(action$)
      .toArray()
      .subscribe(
        (actions) => {
          const { type, socket } = actions[0];
          expect(type).toEqual(SOCKET_CONNECTED);
          expect(Object.keys(socket)).toEqual(Object.keys(Socket()));
        },
      );
  });
});
