import { FETCH_ME, FETCH_TOP_TRACKS, FETCH_TOP_ARTISTS, FETCH_PLAYLISTS } from '../constants/ActionTypes';

function fetchMe(state, me) {
  if(state.me === me) {
    return state;
  }

  return Object.assign({}, state, { fetchingMe: false, me });
}

function fetchTracks(state, topTracks) {
  if(state.topTracks === topTracks) { return state; }

  return Object.assign({}, state, { topTracks, fetchingTracks: false });
}

function fetchArtists(state, topArtists) {
  if(state.artists === topArtists) { return state; }

  return Object.assign({}, state, { topArtists, fetchingArtists: false });
}

function fetchPlaylists(state, playlists) {
  if(state.playlists === playlists) { return state; }

  return Object.assign({}, state, { playlists, fetchingPlaylists: false });
}

const initialState = {
  fetchingMe: false,
  fetchingTracks: false,
  fetchingArtists: false,
  fetchingPlaylists: false,
  me: {},
  error: null,
  topTracks: {
    items: [],
  },
  topArtists: {
    items: [],
  },
  playlists: {
    items: [],
  },
};

export default function account(state = initialState, action) {
  switch(action.type) {
    case FETCH_ME + '_REQUEST':
      return state.fetchingMe ? state : Object.assign({}, state, { fetchingMe: true });
    case FETCH_ME + '_SUCCESS':
      return fetchMe(state, action.me);
    case FETCH_ME + '_FAILURE':
      return Object.assign({}, state, { fetching: false, me: {}, error: action.error });
    case FETCH_TOP_TRACKS + '_REQUEST':
      return state.fetchingTracks ? state : Object.assign({}, state, { fetchingTracks: true });
    case FETCH_TOP_TRACKS + '_SUCCESS':
      return fetchTracks(state, action.topTracks);
    case FETCH_TOP_TRACKS + '_FAILURE':
      return Object.assign({}, state, { fetchingTracks: false, me: {}, error: action.error });
    case FETCH_TOP_ARTISTS + '_REQUEST':
      return state.fetchingArtists ? state : Object.assign({}, state, { fetchingArtists: true });
    case FETCH_TOP_ARTISTS + '_SUCCESS':
      return fetchArtists(state, action.topArtists);
    case FETCH_TOP_ARTISTS + '_FAILURE':
      return Object.assign({}, state, { fetchingArtists: false, me: {}, error: action.error });
    case FETCH_PLAYLISTS + '_REQUEST':
      return state.fetchingPlaylists ? state : Object.assign({}, state, { fetchingPlaylists: true });
    case FETCH_PLAYLISTS + '_SUCCESS':
      return fetchPlaylists(state, action.playlists);
    case FETCH_PLAYLISTS + '_FAILURE':
      return Object.assign({}, state, { fetchingPlaylists: false, me: {}, error: action.error });
    default:
      return state;
  }
}
