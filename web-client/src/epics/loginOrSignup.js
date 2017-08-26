// @flow
import { Observable } from 'rxjs/Observable';
import { ajaxSettingRxjs } from './../actions/api';
import onAuthSuccess from './../actions/onAuthSuccess';

type argsType = {
  errorCb: (any) => Object,
 }

export const authCbAction = (cb: () => mixed) =>
  ({ type: 'LOGIN/SIGNUP SUCCESS EPICS CALLBACK', cb });

export default (
  action$: Object,
  store: any,
   ajax: (any) => Observable<*>,
  type: string,
  { errorCb }: argsType,
) => action$
      .ofType(type)
      .switchMap(({ url, user, cb }) =>
        ajax(ajaxSettingRxjs(url, 'POST', { body: user }))
          .map(({ response }) => Observable.of(
            ...onAuthSuccess(response),
            authCbAction(cb),
          ))
          .catch((error) => Observable.of(Observable.of(errorCb(error)))),
      )
      .switchMap((x) => x)
      .do(({ cb }) => {
        if (cb) {
          cb();
        }
      });
