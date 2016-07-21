import path from 'path';
import express from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { port, protocol, subdomain, domain } from '../../serverConfig.json';
import { SPOTIFY_LOGIN_URL } from 'constants/Spotify';
import { fullUrl } from '../shared/utils/StringUtils';
import auth from './auth';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'dist', 'server', 'views'));

app.use(logger('dev'));
app.use(compress());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const root = path.resolve(process.cwd(), 'dist', 'client');
const client = express.static(root);

if(process.env.NODE_ENV === 'development') {
  const fallback = require('express-history-api-fallback');
  const config = require('../../webpack-dev.config');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use(client);
  app.use(SPOTIFY_LOGIN_URL, auth);
  app.use(fallback('index.html', { root }));
} else {
  const vhost = require('vhost');
  const domainName = fullUrl(protocol, subdomain, domain, port);

  app.use(vhost(domainName, client));
  app.use(SPOTIFY_LOGIN_URL, vhost(domainName, auth));
  app.use(vhost(domainName, require('./spotify')));
}

app.listen(port, err => {
  if(err) {
    throw err;
  }

  console.log(`Started server on port: ${port}`);
});
