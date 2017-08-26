// @flow
import {
  CONNECT_TO_ROOMS_UTILS_CHANNEL,
  CONNECTED_TO_ROOMS_UTILS_CHANNEL_SUCCESS,
} from './../constants';

export const connectToRoomsUtilsChannel = (
  socket: Object,
  userId: string,
  params: Object,
) =>
  ({
    socket,
    userId,
    params,
    type: CONNECT_TO_ROOMS_UTILS_CHANNEL,
  });

export const connectToRoomsUtilsChannelSuccess = (channel: Object) =>
  ({
    channel,
    type: CONNECTED_TO_ROOMS_UTILS_CHANNEL_SUCCESS,
  });
