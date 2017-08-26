// @flow
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import { SIGNUP_USER } from './../constants';
import signup from './signup';
import { signupFailed } from './../actions/signup';
import * as api from './../actions/api';
import * as ajaxErrorHandlerDefault from './../actions/ajaxErrorHandlerRx';
import * as onAuthSuccessDefault from './../actions/onAuthSuccess';
import { authCbAction } from './loginOrSignup';

describe('signup epic', () => {
  const url = 'url';
  const user = {};
  const action$ = ActionsObservable.of({ url, user, type: SIGNUP_USER });
  const store = null;
  const ajaxSettingRxjs = jest.spyOn(api, 'ajaxSettingRxjs');
  const onAuthSuccess = jest.spyOn(onAuthSuccessDefault, 'default');

  afterEach(() => {
    expect(ajaxSettingRxjs)
      .toHaveBeenCalledWith(url, 'POST', { body: user });
  });

  test('signup succeeds', () => {
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

    signup(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions)
          .toEqual([...onAuthSuccess(ajaxResponse.response), authCbAction()]);
      });
  });

  test('signup fails', () => {
    const error = {
      message: 'ajax error 500',
      status: 500,
    };

    const ajaxErrorHandler = jest
      .spyOn(ajaxErrorHandlerDefault, 'default')
      .mockImplementation(() => ({
        xhr: {
          response: error,
        },
      }));

    const dependencies = {
      ajax: () => Observable.throw(error),
    };

    signup(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions)
          .toEqual([
            signupFailed(ajaxErrorHandler(error)),
          ]);

        expect(ajaxErrorHandler).toHaveBeenCalledWith(error);
        // once in this test and once in tested module
        expect(ajaxErrorHandler).toHaveBeenCalledTimes(2);
      });
  });
});
