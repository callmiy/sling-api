// @flow
import { combineEpics } from 'redux-observable';
import logout from './logout';
import login from './login';
import connectToSocket from './connectToSocket';
import refresh from './refresh';
import connectToRoomsUtilsChannel from './connectToRoomsUtilsChannel';
import fetchRooms from './fetchRooms';
import createRoom from './createRoom';
import leaveRoomsUtilsChannel from './leaveRoomsUtilsChannel';
import connectToRoomChannel from './connectToRoomChannel';
import leaveRoomChannel from './leaveRoomChannel';
import createMessage from './createMessage';
import loadOlderMessages from './loadOlderMessages';
import updateRoom from './updateRoom';
import signup from './signup';

export default combineEpics(
  logout,
  connectToSocket,
  login,
  refresh,
  connectToRoomsUtilsChannel,
  fetchRooms,
  createRoom,
  leaveRoomsUtilsChannel,
  connectToRoomChannel,
  leaveRoomChannel,
  createMessage,
  loadOlderMessages,
  updateRoom,
  signup,
);
