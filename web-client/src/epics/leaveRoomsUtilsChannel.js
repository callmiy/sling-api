// @flow

import {
  DISCONNECT_FROM_ROOMS_UTILS_CHANNEL,
} from './../constants';
import {
  leaveRoomsUtilsChannelSuccess,
} from './../actions/leaveRoomsUtilsChannel';

export default (action$: Object) =>
  action$.ofType(DISCONNECT_FROM_ROOMS_UTILS_CHANNEL)
    .map(({ channel }) => {
      if (channel) {
        channel.leave();
      }
      return leaveRoomsUtilsChannelSuccess();
    });
