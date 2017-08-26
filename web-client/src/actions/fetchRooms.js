// @flow
import {
  FETCH_ROOMS,
  FETCH_ROOMS_SUCCESS,
} from './../constants';

export const fetchRooms = (channel: Object, params: Object) =>
  ({
    channel,
    params,
    type: FETCH_ROOMS,
  });

export const fetchRoomsSuccess = (response: Object) =>
  ({ response, type: FETCH_ROOMS_SUCCESS });
