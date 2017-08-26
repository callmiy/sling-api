// @flow
import { signupFailed } from './../actions/signup';
import ajaxErrorHandler from './../actions/ajaxErrorHandlerRx';
import { SIGNUP_USER } from './../constants';
import loginOrSignup from './loginOrSignup';
import type { EpicDependencies } from './../store';

const cb = {
  errorCb: (error) => signupFailed(ajaxErrorHandler(error)),
};

export default ($action: Object, store: any, { ajax }: EpicDependencies) =>
  loginOrSignup($action, store, ajax, SIGNUP_USER, cb);
