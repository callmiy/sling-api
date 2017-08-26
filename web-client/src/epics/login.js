// @flow
import { loginFailed } from './../actions/login';
import ajaxErrorHandler from './../actions/ajaxErrorHandlerRx';
import { LOGIN_USER } from './../constants';
import loginOrSignup from './loginOrSignup';
import type { EpicDependencies } from './../store';

const cb = {
  errorCb: (error) => loginFailed(ajaxErrorHandler(error)),
};

export default ($action: Object, store: any, { ajax }: EpicDependencies) =>
  loginOrSignup($action, store, ajax, LOGIN_USER, cb);
