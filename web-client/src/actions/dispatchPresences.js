// @flow
import { uniqBy } from 'lodash';
import {
  ROOM_PRESENCE_UPDATE,
} from './../constants';

export default ({ users }: Object): Object => ({
  type: ROOM_PRESENCE_UPDATE,
  presentUsers: uniqBy(users.metas, 'id'),
});
