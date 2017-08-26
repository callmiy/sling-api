// @flow
import { Observable } from 'rxjs/Observable';
import {
  FETCH_ROOMS,
  CHANNEL_EVENT_LOAD_ROOMS,
} from './../constants';
import {
  fetchRoomsSuccess,
} from './../actions/fetchRooms';

const fetchRooms = (action$: Object) =>
  action$.ofType(FETCH_ROOMS)
    .switchMap(({ channel, params }) =>
      Observable.create((observer) => {
        if (!channel) {
          return () => {};
        }

        channel
        .push(CHANNEL_EVENT_LOAD_ROOMS, params)
        .receive('ok', (response) =>
          observer.next(fetchRoomsSuccess(response)),
        );

        return () => {};
      }),
    );

export default fetchRooms;
