// @flow
import { Observable } from 'rxjs/Observable';
import { ajaxSettingRxjs } from './../actions/api';
import ajaxErrorHandler from './../actions/ajaxErrorHandlerRx';
import {
  loadOlderMessagesSuccess,
  loadOlderMessagesFailed,
} from './../actions/loadOlderMessages';
import {
  FETCH_MESSAGES,
} from './../constants';
import type { EpicDependencies } from './../store';

export default (
  $action: Object,
  store: any,
  { ajax }: EpicDependencies,
) => $action.ofType(FETCH_MESSAGES)
      .switchMap(({ url, params }) =>
        ajax(ajaxSettingRxjs(url, 'GET', { body: params }))
          .map(({ response }) => loadOlderMessagesSuccess(response))
          .catch((error) =>
            Observable.of(
              loadOlderMessagesFailed(ajaxErrorHandler(error)),
            ),
          ),
      );
