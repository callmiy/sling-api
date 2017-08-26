// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'aphrodite';
import { roomUrl } from './../../constants';
import styles from './styles';


const RoomLink = ({ room }: Object) => (
  <NavLink
    to={roomUrl(room.id)}
    className={css(styles.link)}
    activeClassName={css(styles.activeClassName)}
  >
    <div className={css(styles.badge)}>
      <span>{room.name[0]}</span>
    </div>
  </NavLink>
);

export default RoomLink;
