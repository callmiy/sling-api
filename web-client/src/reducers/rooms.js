// @flow
import { combineReducers } from 'redux';
import {
  CONNECTED_TO_ROOMS_UTILS_CHANNEL_SUCCESS,
  CREATE_ROOM_SUCCESS,
  DISCONNECTED_FROM_ROOMS_UTILS_CHANNEL,
  FETCH_ROOMS_SUCCESS,
  FETCH_USER_ROOMS_SUCCESS,
  ROOM_JOINED,
} from './../constants';

const roomsChannel = (state: null | Object = null, action: Object) => {
  const { type, channel } = action;

  switch (type) {
    case CONNECTED_TO_ROOMS_UTILS_CHANNEL_SUCCESS:
      return channel;

    case DISCONNECTED_FROM_ROOMS_UTILS_CHANNEL:
      return null;

    default:
      return state;
  }
};

const allRooms = (state: Array<Object> = [], action: Object) => {
  const { type, response } = action;

  switch (type) {
    case FETCH_ROOMS_SUCCESS:
      return response.data;

    case CREATE_ROOM_SUCCESS:
      return [response.data, ...state];

    default:
      return state;
  }
};

const initialPagination = {
  total_pages: 0,
  total_entries: 0,
  page_size: 0,
  page_number: 0,
};

const pagination = (
  state: Object = initialPagination,
  { type, response }: Object,
) => {
  switch (type) {
    case FETCH_ROOMS_SUCCESS:
      return response.pagination;

    case CREATE_ROOM_SUCCESS:
      return { ...state, total_entries: state.total_entries + 1 };

    default:
      return state;
  }
};

const currentUserRooms = (state: Array<Object> = [], action: Object) => {
  const { type, response } = action;

  switch (type) {
    case FETCH_USER_ROOMS_SUCCESS:
      return response.data;

    case ROOM_JOINED:
      return [
        ...state,
        response.data,
      ];

    default:
      return state;
  }
};

export default combineReducers({
  all: allRooms,
  channel: roomsChannel,
  pagination,
  currentUserRooms,
});

export const getAllRooms = (state: Object) => state.all;

export const getAllRoomsIds = (state: Object) =>
  state.currentUserRooms.map((r) => r.id);

export const getCurrentUserRooms = (state: Object): Object[] =>
  state.currentUserRooms;

export const getRoomsPagination = (state: Object) =>
  state.pagination;

export const getRoomsChannel = (state: Object) => state.channel;

export const getUserRoomFromRoomId = (
  state: Object,
  roomId: string,
): Object | void =>
  getCurrentUserRooms(state).find((room) => `${room.id}` === roomId);
