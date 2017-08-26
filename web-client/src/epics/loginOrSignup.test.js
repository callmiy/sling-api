// @flow
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import { LOGIN_USER, SIGNUP_USER } from './../constants';
import loginOrSignup, { authCbAction } from './loginOrSignup';
import * as api from './../actions/api';
import * as onAuthSuccessDefault from './../actions/onAuthSuccess';

describe('loginOrSignup epic', () => {
  const url = 'url';
  const user = {};
  const store = null;
  const authCb = jest.fn();
  const ajaxSettingRxjs = jest.spyOn(api, 'ajaxSettingRxjs');
  const onAuthSuccess = jest.spyOn(onAuthSuccessDefault, 'default');
  const ajaxResponse = {
    response: {
      meta: {
        token: '1',
      },
      data: {
        id: '1',
      },
    },
  };
  let errorCb = () => ({});

  afterEach(() => {
    expect(ajaxSettingRxjs)
      .toHaveBeenCalledWith(url, 'POST', { body: user });
  });

  describe('LOGIN_USER', () => {
    const action$ = ActionsObservable.of({
      url, user, type: LOGIN_USER, cb: authCb,
    });

    test('login succeeds', () => {
      const ajax = () => Observable.of(ajaxResponse);

      loginOrSignup(action$, store, ajax, LOGIN_USER, { errorCb })
      .toArray()
      .subscribe((actions) => {
        expect(actions)
          .toEqual([
            ...onAuthSuccess(ajaxResponse.response),
            authCbAction(authCb),
          ]);
        expect(authCb).toHaveBeenCalled();
      });
    });

    test('login fails', () => {
      const error = {
        message: 'ajax error 500',
        status: 500,
      };

      const ajax = () => Observable.throw(error);

      errorCb = () => error;

      loginOrSignup(action$, store, ajax, LOGIN_USER, { errorCb })
      .toArray()
      .subscribe(
        () => {},
        (errors) => {
          expect(errors)
          .toEqual(error);
        });
    });
  });

  describe('SIGNUP_USER', () => {
    const action$ = ActionsObservable.of({
      url, user, type: SIGNUP_USER, cb: authCb,
    });

    test('signup succeeds', () => {
      const ajax = () => Observable.of(ajaxResponse);

      loginOrSignup(action$, store, ajax, SIGNUP_USER, { errorCb })
      .toArray()
      .subscribe((actions) => {
        expect(actions)
          .toEqual([
            ...onAuthSuccess(ajaxResponse.response),
            authCbAction(authCb),
          ]);
      });
    });
  });
});
