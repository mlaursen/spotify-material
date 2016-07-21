import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../shared/stores/configureStore';

import routes from '../shared/routes';

const spotify = express.Router();
spotify.get('/*', (req, res) => {
  const store = configureStore();

  match({ routes, location: req.url }, (error, redirectLocation, props) => {
    if(error) {
      res.status(500).send(error.message);
    } else if(redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if(props) {
      res.render('index', {
        html: renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        ),
        initialState: JSON.stringify({}),
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

export default spotify;
