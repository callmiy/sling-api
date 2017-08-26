// @flow
export const AUTH_TOKEN_ID = 'token';
export const API_REFRESH_URL = '/sessions/refresh';
export const API_LOGIN_URL = '/sessions/login';
export const API_LOGOUT_URL = '/sessions/logout';
export const API_SIGNUP_URL = '/users';
export const apiUserRoomsUrl = (id: string) => `/users/${id}/rooms`;
export const API_ROOMS_URL = '/rooms';
export const apiRoomUrl = (id: string) => `/rooms/${id}`;
export const apiRoomMessagesUrl = (id: string) => `/rooms/${id}/messages`;
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_EPIC = 'LOGOUT_USER_EPIC';
export const REFRESH_SESSION = 'REFRESH_SESSION';
export const REFRESH_FAILED = 'REFRESH_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGIN_URL = '/login';
export const SIGNUP_URL = '/signup';
export const ROOT_URL = '/';
export const BASE_NAME = '/slung';
export const ROOM_URL = '/r/:id';
export const roomUrl = (id: string) => `/r/${id}`;
export const LOGIN_FORM_NAME = 'loginForm';
export const SIGNUP_FORM_NAME = 'signupForm';
export const CONNECT_TO_ROOM_CHANNEL = 'CONNECT_TO_ROOM_CHANNEL';
export const ROOM_CONNECTED_TO_CHANNEL = 'ROOM_CONNECTED_TO_CHANNEL';
export const DISCONNECT_FROM_ROOM_CHANNEL = 'DISCONNECT_FROM_ROOM_CHANNEL';
export const USER_LEFT_ROOM = 'USER_LEFT_ROOM';
export const MESSAGE_CREATED = 'MESSAGE_CREATED';
export const ROOM_PRESENCE_UPDATE = 'ROOM_PRESENCE_UPDATE';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAIL = 'FETCH_MESSAGES_FAIL';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS = 'FETCH_ROOMS';
export const FETCH_USER_ROOMS = 'FETCH_USER_ROOMS';
export const FETCH_USER_ROOMS_SUCCESS = 'FETCH_USER_ROOMS_SUCCESS';
export const FETCH_USER_ROOMS_FAILED = 'FETCH_USER_ROOMS_FAILED';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const ROOM_JOINED = 'ROOM_JOINED';
export const NEW_ROOM_FORM_NAME = 'newRoom';
export const API_URL = process.env.REACT_APP_API_URL || '';
export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';
export const NEW_MESSAGE_FORM = 'newMessage';
export const ROOM_TOPIC_FORM = 'roomTopicForm';
export const CONNECT_TO_ROOMS_UTILS_CHANNEL = 'CONNECT_TO_ROOMS_UTILS_CHANNEL';
export const CONNECTED_TO_ROOMS_UTILS_CHANNEL_SUCCESS =
               'CONNECTED_TO_ROOMS_UTILS_CHANNELS_SUCCESS';
export const DISCONNECTED_FROM_ROOMS_UTILS_CHANNEL =
               'DISCONNECTED_FROM_ROOMS_UTILS_CHANNELS';
export const DISCONNECT_FROM_ROOMS_UTILS_CHANNEL =
               'DISCONNECT_FROM_ROOMS_UTILS_CHANNELS';
export const CREATE_NEW_ROOM = 'CREATE_NEW_ROOM';
export const CREATE_NEW_ROOM_SUCCESS = 'CREATE_NEW_ROOM_SUCCESS';
export const CHANNEL_EVENT_NEW_ROOM = 'new room';
export const CHANNEL_EVENT_ROOM_CREATED = 'room created';
export const CHANNEL_EVENT_NEW_MESSAGE = 'new_message';
export const CREATE_NEW_MESSAGE = 'CREATE_NEW_MESSAGE';
export const CHANNEL_EVENT_MESSAGE_CREATED = 'message_created';
export const CHANNEL_EVENT_LOAD_ROOMS = 'load rooms';
export const getWebSocketUrl = () => {
  const httpHost = /https?/.exec(API_URL)[0];
  const websocketHost = httpHost === 'https' ? 'wss' : 'ws';
  return API_URL
    .replace(httpHost, websocketHost)
    .replace('/api', '');
};
export const CONNECTION_ERROR_TEXT = 'Connection error!';
export const UNKNOWN_ERROR_TEXT = 'Unknown error occured!';
export const WEBSOCKET_ERROR = 'WEBSOCKET_ERROR';
export const CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET';
export const PURGE_SESSION = 'PURGE_SESSION';
