// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import NewRoomForm from './../../components/NewRoomForm';
import Rooms from './../../components/Rooms';
import Pagination from './../../components/Pagination';
import Sidebar from './../../components/Sidebar';
import Navbar from './../../components/Navbar';
import { NEW_ROOM_FORM_NAME } from './../../constants';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

class Home extends Component {
  getRoomPaginationParams = (page: number = 1) => ({
    page,
    page_size: this.props.pagination.page_size,
  })

  pageSize = 5
  props: Object

  loadRooms = (channel: null | Object, page: number) =>
    this.props.fetchRooms(
      channel || this.props.roomsChannel, this.getRoomPaginationParams(page),
    )

  createRoom = (room: Object) =>
    this.props.createRoom(this.props.roomsChannel, room, this.props.history);

  render() {
    const {
      rooms,
      currentUserRoomsIds,
      pagination,
      startSubmit,
     } = this.props;

    const { page_size } = pagination;

    return (
      <div style={{ display: 'flex', height: '100%' }} >
        <Sidebar />

        <div style={{ flex: '1', overflowY: 'auto' }} >
          <Navbar />
          <div className={`card ${css(styles.card)}`}>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }} >
              Create a new room
            </h3>

            <NewRoomForm onSubmit={(room) => {
              startSubmit(NEW_ROOM_FORM_NAME);
              this.createRoom(room);
            }}
            />
          </div>

          {!!pagination.total_entries &&
            <div className={`card ${css(styles.card)}`}>
              <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
                Join a room
              </h3>

              <Rooms
                rooms={rooms.slice(0, page_size)}
                currentUserRoomsIds={currentUserRoomsIds}
                joinRoom={(room) => this.createRoom(room)}
              />

              <Pagination
                {...pagination}
                pageSize={page_size}
                numRooms={rooms.length}
                loadRooms={this.loadRooms}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Home;
