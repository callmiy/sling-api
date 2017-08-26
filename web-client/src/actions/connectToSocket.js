// @flow
import {
  CONNECT_TO_SOCKET,
  SOCKET_CONNECTED,
  WEBSOCKET_ERROR,
} from './../constants';

const connectToSocket = (user: Object) => ({
  user,
  type: CONNECT_TO_SOCKET,
});

export default connectToSocket;

export const socketConnected = (socket: Object) => ({
  socket,
  type: SOCKET_CONNECTED,
});

export const socketError = (error: Object) => ({
  error,
  type: WEBSOCKET_ERROR,
});
