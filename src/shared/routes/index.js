import App from '../containers/App';

export default {
  path: '/',
  component: App,
  getIndexRoute(location, cb) {
    require.ensure([], require => {
      cb(null, { component: require('containers/Home').default });
    });
  },
  getChildRoutes(location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./auth').default,
        require('./account').default,
        require('./playlists').default,
      ]);
    });
  },
};
