import { FETCH_PLAYLIST } from 'constants/ActionTypes';
import { SPOTIFY_API_URL } from 'constants/Spotify';
import fetch from 'utils/fetch';

export function fetchPlaylist(playlistId) {
  return function (dispatch, getState) {
    const { account, auth, playlists } = getState();
    if(playlists[playlistId]) {
      return;
    }

    const { id } = account.me;
    const { accessToken } = auth;

    dispatch({ type: FETCH_PLAYLIST + '_REQUEST' });

    fetch(SPOTIFY_API_URL + `users/${id}/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => response.json())
      .then(playlist => dispatch({ type: FETCH_PLAYLIST + '_SUCCESS', playlist }))
      .catch(error => dispatch({ type: FETCH_PLAYLIST + '_FAILURE', error }));
  };
}
