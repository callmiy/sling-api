// @flow
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import logout from './logout';
import {
  LOGOUT_USER_EPIC,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './../constants';
import * as auth from './../authManager';

describe('logout epic', () => {
  const action$ = ActionsObservable.of({ type: LOGOUT_USER_EPIC });
  const store = null;
  const purgeSession = jest.spyOn(auth, 'purgeSession');

  afterEach(() => {
    expect(purgeSession).toHaveBeenCalled();
  });

  test('logout epic emits "LOGOUT_SUCCESS" when logout succeeds', () => {
    const dependencies = {
      ajax: () => Observable.of({}),
    };

    logout(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions).toEqual([
          { type: LOGOUT_SUCCESS },
        ]);
      });
  });

  test('logout epic emits "LOGOUT_ERROR" when logout fails', () => {
    const error = 'logout error';
    const dependencies = {
      ajax: () => Observable.throw(error),
    };

    logout(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions).toEqual([
          { type: LOGOUT_ERROR, error },
        ]);
      });
  });
});
