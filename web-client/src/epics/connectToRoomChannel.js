// @flow
import { Observable } from 'rxjs/Observable';
import { Presence } from 'phoenix';
import {
  CONNECT_TO_ROOM_CHANNEL,
  CHANNEL_EVENT_MESSAGE_CREATED,
} from './../constants';
import dispatchPresences from './../actions/dispatchPresences';
import {
  connectToRoomChannelSuccess,
} from './../actions/connectToRoomChannel';
import {
  createMessageSuccess,
} from './../actions/createMessage';


export default (action$: Object) =>
  action$.ofType(CONNECT_TO_ROOM_CHANNEL)
    .switchMap(({ socket, roomId }) =>
      Observable.create((observer) => {
        if (!socket) {
          return () => {};
        }

        const channel = socket.channel(`rooms:${roomId}`);

        channel
          .join()
          .receive('ok', (response: Object) => {
            observer.next(connectToRoomChannelSuccess(response, channel));
          });

        let presences = {};

        channel.on('presence_state', (state: Object) => {
          observer.next(dispatchPresences(state));
        });

        channel.on('presence_diff', (diff: Object) => {
          presences = Presence.syncDiff(presences, diff);
          observer.next(dispatchPresences(presences));
        });

        channel.on(CHANNEL_EVENT_MESSAGE_CREATED, (message: Object) => {
          observer.next(createMessageSuccess(message));
        });

        return () => {};
      }),
    );
