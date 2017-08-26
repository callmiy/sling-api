// @flow
import React, { Component } from 'react';
import { css } from 'aphrodite';
import RoomSidebar from './../../components/RoomSidebar';
import MessageForm from './../../components/MessageForm';
import MessageList from './../../components/MessageList';
import RoomNavbar from './../../components/RoomNavbar';
import Sidebar from './../../components/Sidebar';
import Navbar from './../../components/Navbar';
import RevealRoomNavBar from './../../components/RevealRoomNavBar';
import {
  NEW_MESSAGE_FORM,
} from './../../constants';
import styles from './styles';


class Room extends Component {
  state = {
    shouldRevealNavBar: false,
  }

  componentDidMount() {
    this.props.connectToRoomChannel(this.props.socket, this.props.id);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.id !== this.props.id) {
      this.leaveChannel();
    }

    if (!this.props.socket && nextProps.socket) {
      this.props.connectToRoomChannel(nextProps.socket, nextProps.id);
    }
  }

  componentWillUnmount() {
    this.leaveChannel();
  }

  messageListContainer: Object

  props: Object

  leaveChannel = () =>
    this.props.leaveRoomChannel(this.props.channel)

  render() {
    const moreMessages = this.props.pagination.total_pages >
      this.props.pagination.page_number;

    const {
      id,
      room,
      user,
      presentUsers,
      messages,
      loadingOlderMessages,
      loadOlderMessages,
      channel,
      createMessage,
      updateRoom,
    } = this.props;

    const { shouldRevealNavBar } = this.state;

    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar />

        <div className={css(
          shouldRevealNavBar
          ? styles.showNavBarSmallDevice
          : styles.hideNavBarSmallDevice,
        )}
        >
          <RoomSidebar
            room={room}
            user={user}
            presentUsers={presentUsers}
          />
        </div>

        <RevealRoomNavBar
          shouldRevealNavBar={shouldRevealNavBar}
          styles={{
            position: 'absolute',
            top: '-3pxpx',
            left: '49px',
          }}
          onRevealNavBarClick={() =>
            this.setState({ shouldRevealNavBar: !shouldRevealNavBar })}
        />

        <div className={css(
          styles.main,
          !shouldRevealNavBar
          ? styles.showNavBarSmallDevice
          : styles.hideNavBarSmallDevice,
        )}
        >
          <Navbar />

          <RoomNavbar
            room={room}
            updateTopic={(update) => updateRoom(
                update,
                this.props.id,
              )
            }
          />

          <MessageList
            moreMessages={moreMessages}
            messages={messages}
            onLoadMore={() => loadOlderMessages(
              id, { last_seen_id: messages[0].id },
            )}
            ref={(c) => { this.messageListContainer = c; }}
            loadingOlderMessages={loadingOlderMessages}
          />

          <MessageForm onSubmit={(message, dispatch, { reset }) =>
            createMessage(
              message,
              channel,
              () => {
                this.messageListContainer.scrollToBottom();
                reset(NEW_MESSAGE_FORM);
              },
            )}
          />
        </div>
      </div>
    );
  }
}

export default Room;
