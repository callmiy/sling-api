// @flow
import {
  CONNECT_TO_ROOM_CHANNEL,
  ROOM_CONNECTED_TO_CHANNEL,
} from './../constants';

export const connectToRoomChannel = (socket: Object, roomId: string) => ({
  socket,
  roomId,
  type: CONNECT_TO_ROOM_CHANNEL,
});

export const connectToRoomChannelSuccess = (
  response: Object,
  channel: Object,
) => ({
  response,
  channel,
  type: ROOM_CONNECTED_TO_CHANNEL,
});
