// @flow
import {
  DISCONNECT_FROM_ROOMS_UTILS_CHANNEL,
  DISCONNECTED_FROM_ROOMS_UTILS_CHANNEL,
} from './../constants';

export const leaveRoomsUtilsChannel = (channel: Object) => ({
  channel,
  type: DISCONNECT_FROM_ROOMS_UTILS_CHANNEL,
});

export const leaveRoomsUtilsChannelSuccess = () => ({
  type: DISCONNECTED_FROM_ROOMS_UTILS_CHANNEL,
});
