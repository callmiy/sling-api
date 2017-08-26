// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { ROOT_URL } from './../constants';
import { getWebSocketError } from './../reducers';

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    height: '70px',
    background: '#fff',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
  },

  link: {
    marginLeft: '1rem',
    fontSize: '22px',
    color: '#555459',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },
});

const NetworkError = () =>
(
  <Message icon error>
    <Icon name="circle notched" loading />
    <Message.Content>
      <Message.Header>Network error!</Message.Header>
        Attempting to reconnect.
      </Message.Content>
  </Message>
);


const Navbar = ({ error }: {error: Object}) =>
(
  <div className={css(styles.navbar)}>
    {error
    ? <NetworkError />
    : <nav>
      <Link to={ROOT_URL} className={css(styles.link)}>Slung</Link>
    </nav>}
  </div>
);

export default connect(
  (state) =>
    ({ error: getWebSocketError(state) }),
)(Navbar);
