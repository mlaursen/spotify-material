import { SET_SPOTIFY_TOKENS, CLEAR_SPOTIFY_TOKENS } from '../constants/ActionTypes';

function setTokens(state, accessToken, refreshToken) {
  if(state.accessToken === accessToken && state.refreshToken === refreshToken) {
    return state;
  }

  return Object.assign({}, state, { accessToken, refreshToken });
}

function clearTokens(state) {
  if(state.accessToken === null && state.refreshToken === null) { return state; }

  return Object.assign({}, state, { accessToken: null, refreshToken: null });
}

const initialState = {
  accessToken: typeof localStorage !== 'undefined' && localStorage.getItem('accessToken') || null,
  refreshToken: typeof localStorage !== 'undefined' && localStorage.getItem('refreshToken') || null,
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case SET_SPOTIFY_TOKENS:
      return setTokens(state, action.accessToken, action.refreshToken);
    case CLEAR_SPOTIFY_TOKENS:
      return clearTokens(state);
    default:
      return state;
  }
}
