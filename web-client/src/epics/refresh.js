// @flow
import { Observable } from 'rxjs/Observable';
import { REFRESH_SESSION, BASE_NAME } from './../constants';
import { ajaxSettingRxjs } from './../actions/api';
import { refreshFailed } from './../actions/refresh';
import ajaxErrorHandler from './../actions/ajaxErrorHandlerRx';
import { purgeSession } from './../authManager';
import onAuthSuccess from './../actions/onAuthSuccess';
import type { EpicDependencies } from './../store';

const refresh = (
  action$: Object,
  store: any,
  { ajax }: EpicDependencies,
) =>
  action$.ofType(REFRESH_SESSION)
    .switchMap(({ url }) =>
      ajax(ajaxSettingRxjs(url, 'GET'))
        .map(({ response }) => Observable.of(...onAuthSuccess(response)))
        .catch((error) => Observable.throw(error)),
    )
    .switchMap((x) => x)
    .catch((error) => {
      purgeSession();
      window.location = BASE_NAME;
      return Observable.of(refreshFailed(ajaxErrorHandler(error)));
    });

export default refresh;
