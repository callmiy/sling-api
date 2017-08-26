// @flow
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import { LOGIN_USER } from './../constants';
import login from './login';
import { loginFailed } from './../actions/login';
import * as api from './../actions/api';
import * as ajaxErrorHandlerRx from './../actions/ajaxErrorHandlerRx';
import * as onAuthSuccessDefault from './../actions/onAuthSuccess';
import { authCbAction } from './loginOrSignup';

describe('login epic', () => {
  const url = 'url';
  const user = {};
  const action$ = ActionsObservable.of({ url, user, type: LOGIN_USER });
  const store = null;
  const ajaxSettingRxjs = jest.spyOn(api, 'ajaxSettingRxjs');
  const onAuthSuccess = jest.spyOn(onAuthSuccessDefault, 'default');

  afterEach(() => {
    expect(ajaxSettingRxjs)
      .toHaveBeenCalledWith(url, 'POST', { body: user });
  });

  test('login succeeds', () => {
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
    const dependencies = {
      ajax: () => Observable.of(ajaxResponse),
    };

    login(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions)
          .toEqual([...onAuthSuccess(ajaxResponse.response), authCbAction()]);
      });
  });

  test('login fails', () => {
    const error = {
      message: 'ajax error 500',
      status: 500,
    };

    const ajaxErrorHandler = jest
      .spyOn(ajaxErrorHandlerRx, 'default')
      .mockImplementation(() => ({
        xhr: {
          response: error,
        },
      }));

    const dependencies = {
      ajax: () => Observable.throw(error),
    };

    login(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions)
          .toEqual([
            loginFailed(ajaxErrorHandler(error)),
          ]);

        expect(ajaxErrorHandler).toHaveBeenCalledWith(error);
        // once in this test and once in tested module
        expect(ajaxErrorHandler).toHaveBeenCalledTimes(2);
      });
  });
});
