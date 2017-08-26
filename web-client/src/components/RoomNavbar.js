// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import TopicForm from './TopicForm';

const styles = StyleSheet.create({
  navbar: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid rgb(240,240,240)',
  },

  roomMeta: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    height: '24px',
  },

  topicButton: {
    padding: '2px 4px',
    color: 'rgb(120,120,120)',
    background: 'transparent',
    border: '0',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0 0 2px rgba(0,0,0,.25)',
    },
  },

  toggle: {
    cursor: 'pointer',
  },

  teal: {
    color: '#4d394b',
  },
});

export default class RoomNavbar extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      editingTopic: false,
    };
  }

  state: {
    editingTopic: boolean,
  }

  componentWillReceiveProps(nextProps: Object) {
    if (
        (nextProps.room.id !== this.props.room.id) ||
        (nextProps.room.topic !== this.props.room.topic)
    ) {
      this.setState({ editingTopic: false });
    }
  }

  props: {
    room: Object,
    updateTopic: (...any) => mixed,
  }

  render() {
    const {
      room,
      updateTopic,
     } = this.props;

    const { editingTopic } = this.state;

    return (
      <nav className={css(styles.navbar)}>
        <div>#{room.name}</div>
        <div className={css(styles.roomMeta)}>
          {editingTopic
            ?
              <TopicForm
                onSubmit={updateTopic}
                initialValues={{ topic: room.topic }}
                onCancel={() => this.setState({ editingTopic: false })}
              />
            :
              <button
                className={css(styles.topicButton)}
                onClick={() => this.setState({ editingTopic: true })}
              >
                {room.topic ? room.topic : 'General chat and discussion'}
              </button>
          }
        </div>
      </nav>
    );
  }
}
