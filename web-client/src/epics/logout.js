// @flow
import { Observable } from 'rxjs/Observable';

import { ajaxSettingRxjs } from './../actions/api';
import {
  API_LOGOUT_URL,
  LOGOUT_USER_EPIC,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './../constants';
import { purgeSession } from './../authManager';
import type { EpicDependencies } from './../store';

const logout = (
  action$: Object,
  store: any,
  { ajax }: EpicDependencies,
) => action$.ofType(LOGOUT_USER_EPIC)
      .switchMap(() =>
        ajax(ajaxSettingRxjs(API_LOGOUT_URL, 'DELETE'))
          .map(() =>
            // in the future we may not want to reload the window but
            // return our redux store to default
            ({ type: LOGOUT_SUCCESS }),
          )
          .catch((error) =>
            // we handle error in the future if we are not reloading window
            Observable.of({ type: LOGOUT_ERROR, error }),
          )
          .finally(() => {
            purgeSession();
            return window.location.reload(true);
          }),
      );

export default logout;
