// @flow
import {
  CREATE_NEW_MESSAGE,
  MESSAGE_CREATED,
} from './../constants';

export const createMessage = (
  message: Object, channel: Object, cb: () => mixed,
) => ({
  message,
  channel,
  cb,
  type: CREATE_NEW_MESSAGE,
});

export const createMessageSuccess = (
  message: Object,
) => ({
  message,
  type: MESSAGE_CREATED,
});
