import { FETCH_CATEGORIES, FETCH_NEW_RELEASES, SELECT_CATEGORY } from 'constants/ActionTypes';
import { SPOTIFY_API_URL } from 'constants/Spotify';
import { fetch } from 'utils/fetch';

const BROWSE_URL = SPOTIFY_API_URL + 'browse/';

export function fetchCategories() {
  return function (dispatch, getState) {
    const { accessToken } = getState().auth;

    return fetch(BROWSE_URL + 'categories', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => response.json())
      .then(({ categories }) => dispatch({ type: FETCH_CATEGORIES + '_SUCCESS', categories }))
      .catch(error => dispatch({ type: 'global_error', error }));
  };
}

export function fetchNewReleases() {
  return function (dispatch, getState) {
    const { accessToken } = getState().auth;

    return fetch(BROWSE_URL + 'new-releases', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => response.json())
      .then(({ albums }) => dispatch({ type: FETCH_NEW_RELEASES + '_SUCCESS', newReleases: albums }))
      .catch(error => dispatch({ type: 'GLOBAL_ERROR', error }));
  };
}

export function fetchCategoryPlaylists(id, href) {
  return function (dispatch, getState) {
    const { accessToken } = getState().auth;

    return fetch(href + '/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => response.json())
      .then(({ playlists }) => dispatch({ type: 'FETCH_CATEGORY_PLAYLISTS_SUCCESS', playlists, id }))
      .catch(error => dispatch({ type: 'GLOBAL_ERROR', error }));
  };
}

export function selectCategory (category) {
  return { type: SELECT_CATEGORY, category };
}
