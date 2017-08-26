// @flow
import React, { Component } from 'react';
import { groupBy, mapKeys, includes, debounce } from 'lodash';
import { css, StyleSheet } from 'aphrodite';
import moment from 'moment';
import Message from './Message';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    padding: '10px 10px 0 10px',
    background: '#fff',
    overflowY: 'auto',
  },

  dayDivider: {
    position: 'relative',
    margin: '1rem 0',
    textAlign: 'center',
    '::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: '0',
      left: '0',
      height: '1px',
      background: 'rgb(240,240,240)',
    },
  },

  dayText: {
    zIndex: '1',
    position: 'relative',
    background: '#fff',
    padding: '0 12px',
  },
});

class MessageList extends Component {
  constructor(props: Object) {
    super(props);
    this.handleScroll = debounce(() => {
      if (this.props.moreMessages && this.container.scrollTop < 20) {
        this.props.onLoadMore();
      }
    }, 200);
  }

  componentDidMount() {
    this.container.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.messages.length !== this.props.messages.length) {
      this.mayBeScrollToBottom();
    }
  }

  props: Object
  container: Object
  handleScroll: () => mixed

  mayBeScrollToBottom = () => {
    if (
      (this.container.scrollHeight - this.container.scrollTop) <
      (this.container.clientHeight + 50)
    ) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => setTimeout(
    () => { this.container.scrollTop = this.container.scrollHeight; },
  );

  renderDays = () => {
    const messages: Array<Object> = this.props.messages.map((m: Object) => ({
      ...m,
      day: moment(m.inserted_at).format('MMMM Do'),
    }));

    const days: Array<Object> = [];
    mapKeys(groupBy(messages, 'day'), (v, k) => days.push({
      date: k,
      messages: v,
    }));

    const today: string = moment().format('MMMM Do');
    const yesterday: string = moment().subtract(1, 'days').format('MMMM Do');

    return days.map((d: Object) => (
      <div key={d.date}>
        <div className={css(styles.dayDivider)}>
          <span className={css(styles.dayText)}>
            {d.date === today && 'Today'}
            {d.date === yesterday && 'Yesterday'}
            {!includes([today, yesterday], d.date) && d.date}
          </span>
        </div>

        { d.messages.map((m) => <Message key={m.id} {...m} />) }
      </div>
    ));
  }

  render() {
    const {
      moreMessages,
      onLoadMore,
      loadingOlderMessages,
    } = this.props;

    return (
      <div className={css(styles.container)} ref={(c) => { this.container = c; }}>
        {moreMessages &&
          <div style={{ textAlign: 'center' }}>
            <button
              className="btn btn-link btn-sm"
              onClick={onLoadMore}
              disabled={loadingOlderMessages}
            >
              {loadingOlderMessages ? 'Loading' : 'Load more'}
            </button>
          </div>
        }

        {this.renderDays()}
      </div>
    );
  }
}

export default MessageList;
