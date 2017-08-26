// @flow
import { Observable } from 'rxjs/Observable';
import { Socket } from 'phoenix';
import {
  getWebSocketUrl,
  CONNECT_TO_SOCKET,
} from './../constants';
import { readSession } from './../authManager';
import {
  socketConnected,
  socketError,
} from './../actions/connectToSocket';
import {
  connectToRoomsUtilsChannel,
} from './../actions/connectToRoomsUtilsChannel';

const socketObservable = (user) =>
 Observable.create((observer: Object) => {
   const socket = new Socket(`${getWebSocketUrl()}/socket`, { params: {
     token: readSession(),
   } });

   socket.connect();

   socket.onOpen(() => {
     observer.next(socketConnected(socket));
     observer.next(
      connectToRoomsUtilsChannel(socket, user.id, { page: 1, page_size: 5 }),
    );
   });

   socket.onError((error) =>
      observer.next(socketError(error)),
  );

   return () => {
    // socket.disconnect();
   };
 });

export default (
  action$: Object,
) => action$.ofType(CONNECT_TO_SOCKET)
.switchMap(({ user }) =>
  socketObservable(user)
    .catch((error) => Observable.of(error)),
);
