export const SPOTIFY_LOGIN_URL = '/auth/spotify';
export const SPOTIFY_CALLBACK_URL = `http://localhost:8080${SPOTIFY_LOGIN_URL}/callback`;
export const SPOTIFY_STATE_KEY = 'spotify_auth_state';

export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_API_URL = 'https://api.spotify.com/v1/';

export const SCOPE = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'playlist-read-private',
];
