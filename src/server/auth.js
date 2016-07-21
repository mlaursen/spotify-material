import express from 'express';
import { generate } from 'randomstring';
import Spotify from 'spotify-web-api-node';

import { clientId, clientSecret } from '../../spotifyConfig.json';
import { SPOTIFY_STATE_KEY, SPOTIFY_CALLBACK_URL, SCOPE } from '../shared/constants/Spotify';

const spotifyAPI = new Spotify({
  clientId,
  clientSecret,
  redirectUri: SPOTIFY_CALLBACK_URL,
});

const auth = express.Router();
auth.get('/', (req, res) => {
  const state = generate({ length: 16 });
  res.cookie(SPOTIFY_STATE_KEY, state);
  res.redirect(spotifyAPI.createAuthorizeURL(SCOPE, state));
});

auth.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[SPOTIFY_STATE_KEY] : null;

  if(state === null || state !== storedState) {
    res.redirect('/auth/spotify');
  } else {
    res.clearCookie(SPOTIFY_STATE_KEY);

    spotifyAPI.authorizationCodeGrant(code)
      .then(data => {
        const { access_token, refresh_token } = data.body;

        res.redirect(`/auth/spotify/${access_token}/${refresh_token}`);
      })
      .catch(() => {
        res.redirect('/auth/spotify');
      });
  }
});

export default auth;
