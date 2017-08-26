// @flow
import {
  FETCH_USER_ROOMS_SUCCESS,
  FETCH_USER_ROOMS_FAILED,
} from './../constants';

export const fetchUserRoomsSuccess = (response: Object) =>
  ({ response, type: FETCH_USER_ROOMS_SUCCESS });


export const fetchUserRoomsFailed = (error: Object) =>
  ({ error, type: FETCH_USER_ROOMS_FAILED });
