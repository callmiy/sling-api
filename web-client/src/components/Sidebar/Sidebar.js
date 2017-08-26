// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'aphrodite';
import { ROOT_URL } from './../../constants';
import RoomLink from './RoomLink';
import styles from './styles';

type propType = {
  rooms: Object[],
  logout: () => void,
}

const Sidebar = (props: propType) => {
  const { rooms, logout } = props;

  return (
    <div className={css(styles.sideBar)}>
      {rooms.map((r) => <RoomLink key={r.id} room={r} />)}

      <NavLink
        to={ROOT_URL}
        className={css(styles.link)}
        activeClassName={css(styles.activeClassName)}
      >

        <div className={css(styles.badge)}>
          <span className="fa fa-plus" />
        </div>
      </NavLink>

      <div style={{ flex: '1' }} />

      <button
        className={css(styles.link, styles.logoutButton)}
        onClick={logout}
      >
        <div className={css(styles.badge)}>
          <span className="fa fa-sign-out" />
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
