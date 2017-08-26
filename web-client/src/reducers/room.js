// @flow
import { combineReducers } from 'redux';
import {
  ROOM_CONNECTED_TO_CHANNEL,
  USER_LEFT_ROOM,
  MESSAGE_CREATED,
  ROOM_PRESENCE_UPDATE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  UPDATE_ROOM_SUCCESS,
} from './../constants';

const roomChannel = (state: null | Object = null, { type, channel }) => {
  switch (type) {
    case ROOM_CONNECTED_TO_CHANNEL:
      return channel;

    case USER_LEFT_ROOM:
      return null;

    default:
      return state;
  }
};

const currentRoom = (state: Object = {}, { type, response }) => {
  switch (type) {
    case ROOM_CONNECTED_TO_CHANNEL:
      return response.room;

    case USER_LEFT_ROOM:
      return {};

    case UPDATE_ROOM_SUCCESS:
      return response.data;

    default:
      return state;
  }
};

const messages = (
  state: Array<Object> = [],
  { type, response, message }: Object,
) => {
  switch (type) {
    case ROOM_CONNECTED_TO_CHANNEL:
      return response.messages.reverse();

    case USER_LEFT_ROOM:
      return [];

    case MESSAGE_CREATED:
      return [...state, message];

    case FETCH_MESSAGES_SUCCESS:
      return [
        ...response.data.reverse(),
        ...state,
      ];

    default:
      return state;
  }
};

const roomUsers = (
  state: Array<Object> = [],
  { type, presentUsers }: Object,
) => {
  switch (type) {
    case USER_LEFT_ROOM:
      return [];

    case ROOM_PRESENCE_UPDATE:
      return presentUsers;

    default:
      return state;
  }
};

const loadingOlderMessages = (state: boolean = false, { type }: Object) => {
  switch (type) {
    case USER_LEFT_ROOM:
    case FETCH_MESSAGES_SUCCESS:
    case FETCH_MESSAGES_FAIL:
      return false;

    case FETCH_MESSAGES_REQUEST:
      return true;

    default:
      return state;
  }
};

const paginationInit = {
  total_pages: 0,
  total_entries: 0,
  page_size: 0,
  page_number: 0,
};

const pagination = (
  state: Object = paginationInit,
  { type, response }: Object,
) => {
  switch (type) {
    case ROOM_CONNECTED_TO_CHANNEL:
    case FETCH_MESSAGES_SUCCESS:
      return response.pagination;

    case USER_LEFT_ROOM:
      return paginationInit;

    default:
      return state;
  }
};

export default combineReducers({
  channel: roomChannel,
  presentUsers: roomUsers,
  currentRoom,
  messages,
  loadingOlderMessages,
  pagination,
});

export const getChannel = (state: Object) => state.channel;
export const getCurrentRoom = (state: Object) => state.currentRoom;
export const getMessages = (state: Object) => state.messages;
export const getPresentUsers = (state: Object) => state.presentUsers;
export const getLoadingOlderMessages = (state: Object) =>
 state.loadingOlderMessages;
export const getPagination = (state: Object) => state.pagination;
