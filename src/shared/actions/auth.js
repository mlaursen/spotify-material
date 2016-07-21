import { SET_SPOTIFY_TOKENS, CLEAR_SPOTIFY_TOKENS } from '../constants/ActionTypes';

export function setAuth(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return { type: SET_SPOTIFY_TOKENS, accessToken, refreshToken };
}

export function clearAuth() {
  localStorage.clear();
  return { type: CLEAR_SPOTIFY_TOKENS };
}
