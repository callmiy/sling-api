// @flow
import { connect } from 'react-redux';
import { startSubmit } from 'redux-form';
import {
  getAllRooms,
  getAllRoomsIds,
  getRoomsChannel,
  getRoomsPagination,
} from './../../reducers';
import Home from './Home';
import { fetchRooms } from './../../actions/fetchRooms';
import { createRoom } from './../../actions/createRoom';

export default connect(
  (state) => ({
    rooms: getAllRooms(state),
    currentUserRoomsIds: getAllRoomsIds(state),
    pagination: getRoomsPagination(state),
    roomsChannel: getRoomsChannel(state),
  }),
  {
    fetchRooms,
    createRoom,
    startSubmit,
  },
)(Home);

