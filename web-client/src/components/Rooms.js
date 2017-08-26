// @flow
import React from 'react';
import includes from 'lodash/includes';
import { Button } from 'semantic-ui-react';

const Rooms = (props: Object) => {
  const { rooms, currentUserRoomsIds, joinRoom } = props;

  return (
    <div style={{ marginBottom: '1rem' }}>
      {rooms.map((room) => {
        const isJoined = includes(currentUserRoomsIds, room.id);

        return (
          <div
            key={room.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span> {room.name} </span>

            <Button
              animated
              onClick={() => joinRoom(room)}
              className="btn btn-sm"
              disabled={isJoined}
            >
              <Button.Content visible>
                {isJoined ? 'Joined' : 'Join'}
              </Button.Content>

              <Button.Content hidden>
                id: {room.id}
              </Button.Content>
            </Button>
          </div>
        );
      })
      }
    </div>
  );
};
export default Rooms;
