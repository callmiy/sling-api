// @flow
import { stopSubmit } from 'redux-form';
import {
  UPDATE_ROOM,
  UPDATE_ROOM_SUCCESS,
  NEW_MESSAGE_FORM,
  apiRoomUrl,
} from './../constants';

export const updateRoom = (room: Object, roomId: string) => ({
  room,
  url: apiRoomUrl(roomId),
  type: UPDATE_ROOM,
});

export const updateRoomSuccess = (response: Object) => ({
  response,
  type: UPDATE_ROOM_SUCCESS,
});

export const updateRoomFailed = (error: string | Object) =>
  stopSubmit(NEW_MESSAGE_FORM, error);
