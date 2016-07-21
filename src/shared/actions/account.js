import {
  FETCH_ME,
  FETCH_TOP_TRACKS,
  FETCH_TOP_ARTISTS,
  FETCH_PLAYLISTS,
} from '../constants/ActionTypes';
import { SPOTIFY_API_URL } from '../constants/Spotify';
import fetch from 'utils/fetch';

export function fetchMe() {
  return fetch(SPOTIFY_API_URL + 'me', FETCH_ME, 'me');
}

export function fetchTopTracks() {
  return fetch(SPOTIFY_API_URL + 'me/top/tracks', FETCH_TOP_TRACKS, 'topTracks');
}

export function fetchTopArtists() {
  return fetch(SPOTIFY_API_URL + 'me/top/artists', FETCH_TOP_ARTISTS, 'topArtists');
}

export function fetchPlaylists() {
  return fetch(SPOTIFY_API_URL + 'me/playlists', FETCH_PLAYLISTS, 'playlists');
}
