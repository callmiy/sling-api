// @flow
import { Observable } from 'rxjs/Observable';
import {
  CREATE_NEW_MESSAGE,
  CHANNEL_EVENT_NEW_MESSAGE,
} from './../constants';

export default (action$: Object) =>
  action$.ofType(CREATE_NEW_MESSAGE)
    .switchMap(({ message, channel, cb }) =>
      Observable.create((observer) => {
        if (!channel) {
          return () => {};
        }
        channel
        .push(CHANNEL_EVENT_NEW_MESSAGE, message)
        .receive('ok', () => observer.next(
          { type: 'new_msg', payload: 'ok', cb }),
        )
        .receive('error', () => observer.next(
          { type: 'new_msg', payload: 'error', cb }),
        );

        return () => {};
      }),
    )
    .do((val$) => val$.cb())
    .map((val$) => val$);
