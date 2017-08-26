// @flow
import React from 'react';
import moment from 'moment';
import avatar from './../images/gravatar.jpg';

const Avarta = (props: Object) => {
  const { email, size = 40, style } = props;

  return (
    <img
      src={avatar}
      alt={email}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '4px',
        ...style,
      }}
    />
  );
};

const Message = (props: Object) => {
  const { text, inserted_at, user } = props;

  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <Avarta email={user.email} style={{ marginRight: '10px' }} />

      <div>
        <div style={{ lineHeight: '1.2' }}>
          <b style={{ marginRight: '8px', fontSize: '14px' }}>
            {user.username}
          </b>
          <time style={{ fontSize: '12px', color: 'rgb(192,192,192)' }}>
            {moment(inserted_at).format('h:mm A')}
          </time>
        </div>

        <div>{text}</div>
      </div>
    </div>
  );
};

export default Message;
