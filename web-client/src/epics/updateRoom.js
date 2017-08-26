// @flow
import { Observable } from 'rxjs/Observable';
import { ajaxSettingRxjs } from './../actions/api';
import { UPDATE_ROOM } from './../constants';
import { updateRoomSuccess, updateRoomFailed } from './../actions/updateRoom';
import ajaxErrorHandler from './../actions/ajaxErrorHandlerRx';
import type { EpicDependencies } from './../store';

export default (
  $action: Object,
  store: any,
  { ajax }: EpicDependencies,
) => $action.ofType(UPDATE_ROOM)
      .switchMap(({ url, room }) =>
        ajax(ajaxSettingRxjs(url, 'PATCH', { body: { room } }))
          .map(({ response }) => updateRoomSuccess(response))
          .catch((error) =>
            Observable.of(
              updateRoomFailed(ajaxErrorHandler(error)),
            ),
          ),
      );
