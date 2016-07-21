import { FETCH_PLAYLIST } from 'constants/ActionTypes';

function fetchPlaylist(state, playlist) {
  if(state[playlist.id] === playlist) {
    return state;
  }

  return Object.assign({}, state, { [playlist.id]: playlist });
}

export default function playlist(state = {}, action) {
  switch(action.type) {
    case FETCH_PLAYLIST + '_REQUEST':
      return state.fetching ? state : Object.assign({}, state, { fetching: true });
    case FETCH_PLAYLIST + '_SUCCESS':
      return fetchPlaylist(state, action.playlist);
    case FETCH_PLAYLIST + '_FAILURE':
      return state;
    default:
      return state;
  }
}
