export default {
  path: 'playlists/:playlistId',
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('containers/Playlist').default);
    });
  },
};
