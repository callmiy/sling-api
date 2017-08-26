// @flow
import { combineReducers } from 'redux';
import { readSession } from './../authManager';
import {
  AUTHENTICATION_SUCCESS,
  LOGOUT_SUCCESS,
  SOCKET_CONNECTED,
  WEBSOCKET_ERROR,
} from './../constants';

const webSocketError = (state: null = null, { type, error }: Object) => {
  switch (type) {
    case WEBSOCKET_ERROR:
      return error;

    case SOCKET_CONNECTED:
      return null;

    default:
      return state;
  }
};

const isAuthenticated = (state: boolean = false, { type }: Object) => {
  switch (type) {
    case AUTHENTICATION_SUCCESS:
      return true;

    case LOGOUT_SUCCESS:
      return false;

    default:
      return state;
  }
};

const shouldAuthenticateInit = !!readSession();

const shouldAuthenticate = (
  state: boolean = shouldAuthenticateInit,
  { type }: Object,
) => {
  switch (type) {
    case AUTHENTICATION_SUCCESS:
    case LOGOUT_SUCCESS:
      return false;

    default:
      return state;
  }
};

const user = (
  state: null | Object = null,
  { type, response }: Object,
) => {
  switch (type) {
    case AUTHENTICATION_SUCCESS:
      return response.data;

    case LOGOUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

const sessionSocket = (
  state: null | Object = null,
  { type, socket }: Object,
) => {
  switch (type) {
    case SOCKET_CONNECTED:
      return socket;

    case LOGOUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  socket: sessionSocket,
  user,
  isAuthenticated,
  shouldAuthenticate,
  webSocketError,
});

export const getIsAuthenticated = (state: Object) => state.isAuthenticated;

export const getShouldAuthenticate = (state: Object) =>
  state.shouldAuthenticate;

export const getUser = (state: Object) => state.user;
export const getSocket = (state: Object) => state.socket;
export const getWebSocketError = (state: Object) => state.webSocketError;
