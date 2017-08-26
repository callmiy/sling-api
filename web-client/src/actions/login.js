// @flow
import { stopSubmit } from 'redux-form';
import {
  LOGIN_USER,
  API_LOGIN_URL,
  LOGIN_FORM_NAME,
  ROOT_URL,
} from './../constants';
import flattenAjaxError from './flattenAjaxError';

const login = (user: Object, router: Object) => ({
  user,
  type: LOGIN_USER,
  url: API_LOGIN_URL,
  cb: () => router.replace(ROOT_URL),
});

export default login;

export const loginFailed = (error: string | Object) =>
  stopSubmit(LOGIN_FORM_NAME, flattenAjaxError(error));
