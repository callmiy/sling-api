// @flow
import { Observable } from 'rxjs/Observable';
import {
  CONNECT_TO_ROOMS_UTILS_CHANNEL,
  CHANNEL_EVENT_ROOM_CREATED,
} from './../constants';
import {
  connectToRoomsUtilsChannelSuccess,
} from './../actions/connectToRoomsUtilsChannel';
import { fetchUserRoomsSuccess } from './../actions/fetchUserRooms';
import { fetchRoomsSuccess } from './../actions/fetchRooms';
import { createRoomSuccess, roomJoined } from './../actions/createRoom';

export default (action$: Object) =>
  action$.ofType(CONNECT_TO_ROOMS_UTILS_CHANNEL)
    .switchMap(({ socket, userId, params }) =>
      Observable.create((observer) => {
        if (!socket) {
          return () => {};
        }

        const channel = socket.channel('rooms:utils', params);

        channel.join().receive('ok', ({ user_rooms, rooms }) => {
          observer.next(
            connectToRoomsUtilsChannelSuccess(channel),
          );

          observer.next(
            fetchUserRoomsSuccess(user_rooms),
          );

          observer.next(
            fetchRoomsSuccess(rooms),
          );
        },
        );

        channel.on(CHANNEL_EVENT_ROOM_CREATED, (response: { meta: Object }) => {
          const { user_id, status } = response.meta;

          if (status === 'new') {
            observer.next(createRoomSuccess(response));
          }

          if (user_id === userId) {
            observer.next(roomJoined(response));
          }
        });

        return () => {};
      }),
    );
