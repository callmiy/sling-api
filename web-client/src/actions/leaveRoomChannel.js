// @flow

import {
  DISCONNECT_FROM_ROOM_CHANNEL,
  USER_LEFT_ROOM,
} from './../constants';

export const leaveRoomChannel = (channel: Object) => ({
  channel,
  type: DISCONNECT_FROM_ROOM_CHANNEL,
});

export const leaveRoomChannelSuccess = () => ({
  type: USER_LEFT_ROOM,
});
