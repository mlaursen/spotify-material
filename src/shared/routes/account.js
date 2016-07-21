export default {
  path: 'account',
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('../containers/Account').default);
    });
  },
};
