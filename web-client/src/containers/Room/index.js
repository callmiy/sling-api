// @flow
import { connect } from 'react-redux';
import {
  getSocket,
  getUser,
  getChannel,
  getMessages,
  getRoomPagination,
  getLoadingOlderMessages,
  getPresentUsers,
  getCurrentRoom,
} from './../../reducers';
import Room from './Room';
import {
  connectToRoomChannel,
} from './../../actions/connectToRoomChannel';
import {
  leaveRoomChannel,
} from './../../actions/leaveRoomChannel';
import {
  createMessage,
} from './../../actions/createMessage';
import {
  loadOlderMessages,
} from './../../actions/loadOlderMessages';
import {
  updateRoom,
} from './../../actions/updateRoom';

export default connect(
  (state, ownProps) => ({
    id: ownProps.match.params.id,
    socket: getSocket(state),
    user: getUser(state),
    channel: getChannel(state),
    messages: getMessages(state),
    pagination: getRoomPagination(state),
    loadingOlderMessages: getLoadingOlderMessages(state),
    presentUsers: getPresentUsers(state),
    room: getCurrentRoom(state),
  }),
  {
    connectToRoomChannel,
    leaveRoomChannel,
    createMessage,
    loadOlderMessages,
    updateRoom,
  },
)(Room);
