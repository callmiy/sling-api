// @flow
import { Observable } from 'rxjs/Observable';
import {
  CREATE_NEW_ROOM,
  CHANNEL_EVENT_NEW_ROOM,
} from './../constants';
import {
  createRoomFailed,
} from './../actions/createRoom';


export default (action$: Object) =>
  action$.ofType(CREATE_NEW_ROOM)
    .switchMap(({ channel, room, cb }) =>
      Observable.create((observer) => {
        if (!channel) {
          return () => {};
        }

        channel
          .push(CHANNEL_EVENT_NEW_ROOM, room)
          .receive('ok', ({ room_id }) =>
            observer.next({
              cb,
              room_id,
              type: 'CREATE_NEW_ROOM_SUCCESS_CB',
            }),
          )
          .receive('error', ({ errors }) =>
            observer.next(createRoomFailed(errors)),
          );

        return () => {};
      }),
    )
    .map((val) => val)
    .do(({ cb, room_id }) => {
      if (cb) {
        cb(room_id);
      }
    });
