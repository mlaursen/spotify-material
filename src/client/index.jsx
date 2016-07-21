import './styles.scss';
import React from 'react';
import { render } from 'react-dom';
import WebFont from 'webfontloader';
import { match, browserHistory } from 'react-router';

import Root from './containers/Root';
import configureStore from '../shared/stores/configureStore';
import routes from '../shared/routes';

const history = browserHistory;
WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const store = configureStore(window.__INITIAL_STATE__);
if(process.env.NODE_ENV === 'development') {
  render(<Root store ={store} history={history} routes={routes} />, document.getElementById('app'));
} else {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(<Root store ={store} {...renderProps} />, document.getElementById('app'));
  });
}
