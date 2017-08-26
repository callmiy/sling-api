// @flow
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session, * as fromSession from './session';
import { LOGOUT_SUCCESS } from './../constants';
import room, * as fromRoom from './room';
import rooms, * as fromRooms from './rooms';

const reducers = combineReducers({
  form,
  session,
  room,
  rooms,
});

const appReducers = (state: Object, action: Object) => {
  if (action.type === LOGOUT_SUCCESS) {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

export default appReducers;

export const getIsAuthenticated = (state: Object) =>
  fromSession.getIsAuthenticated(state.session);

export const getShouldAuthenticate = (state: Object) =>
  fromSession.getShouldAuthenticate(state.session);

export const getWebSocketError = (state: Object) =>
  fromSession.getWebSocketError(state.session);

export const getSocket = (state: Object) =>
  fromSession.getSocket(state.session);

export const getUser = (state: Object) =>
  fromSession.getUser(state.session);

export const getAllRooms = (state: Object) =>
  fromRooms.getAllRooms(state.rooms);

export const getAllRoomsIds = (state: Object) =>
  fromRooms.getAllRoomsIds(state.rooms);

export const getCurrentUserRooms = (state: Object) =>
  fromRooms.getCurrentUserRooms(state.rooms);

export const getRoomsPagination = (state: Object) =>
  fromRooms.getRoomsPagination(state.rooms);

export const getRoomsChannel = (state: Object) =>
  fromRooms.getRoomsChannel(state.rooms);

export const getUserRoomFromRoomId = (
  state: Object,
  roomId: string,
): Object | void =>
  fromRooms.getUserRoomFromRoomId(state.rooms, roomId);

export const getChannel = (state: Object) =>
  fromRoom.getChannel(state.room);

export const getCurrentRoom = (state: Object) =>
  fromRoom.getCurrentRoom(state.room);

export const getMessages = (state: Object) =>
  fromRoom.getMessages(state.room);

export const getPresentUsers = (state: Object) =>
  fromRoom.getPresentUsers(state.room);

export const getLoadingOlderMessages = (state: Object) =>
  fromRoom.getLoadingOlderMessages(state.room);

export const getRoomPagination = (state: Object) =>
  fromRoom.getPagination(state.room);
