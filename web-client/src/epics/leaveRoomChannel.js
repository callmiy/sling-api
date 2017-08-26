// @flow

import {
  leaveRoomChannelSuccess,
} from './../actions/leaveRoomChannel';
import {
  DISCONNECT_FROM_ROOM_CHANNEL,
} from './../constants';

export default (action$: Object) =>
  action$.ofType(DISCONNECT_FROM_ROOM_CHANNEL)
    .map(({ channel }) => {
      if (channel) {
        channel.leave();
      }
      return leaveRoomChannelSuccess();
    });
