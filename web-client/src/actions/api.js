// @flow
import { readSession } from './../authManager';
import { API_URL } from './../constants';

export const headers = () => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${readSession() || ''}`,
  },
});

export const ajaxSettingRxjs = (
  url: string,
  method: string,
  others: Object = {}) => ({
    method,
    url: `${API_URL}${url}`,
    crossDomain: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer: ${readSession() || ''}`,
    },
    ...others,
  });
