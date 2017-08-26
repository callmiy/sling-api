// @flow
import { AUTH_TOKEN_ID } from './constants';

export const readSession = () => localStorage.getItem(AUTH_TOKEN_ID);

export const writeSession = (token: string) =>
  localStorage.setItem(AUTH_TOKEN_ID, token);

export const purgeSession = () => localStorage.removeItem(AUTH_TOKEN_ID);
