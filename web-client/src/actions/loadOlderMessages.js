// @flow
import {
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  apiRoomMessagesUrl,
} from './../constants';

export const loadOlderMessages = (roomId: string, params: Object) => ({
  params,
  url: apiRoomMessagesUrl(roomId),
  type: FETCH_MESSAGES,
});

export const loadOlderMessagesSuccess = (response: Object) => ({
  response,
  type: FETCH_MESSAGES_SUCCESS,
});

export const loadOlderMessagesFailed = (error: string | Object) => ({
  error,
  type: FETCH_MESSAGES_FAIL,
});
