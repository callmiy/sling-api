// @flow
import { stopSubmit } from 'redux-form';
import {
  SIGNUP_USER,
  API_SIGNUP_URL,
  SIGNUP_FORM_NAME,
  ROOT_URL,
} from './../constants';
import flattenAjaxError from './flattenAjaxError';

export const signup = (user: Object, router: Object) => ({
  user,
  type: SIGNUP_USER,
  url: API_SIGNUP_URL,
  cb: () => router.replace(ROOT_URL),
});

export const signupFailed = (error: string | Object) =>
  stopSubmit(SIGNUP_FORM_NAME, flattenAjaxError(error));
