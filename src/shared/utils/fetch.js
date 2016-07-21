if(!global.fetch) {
  require.ensure([], require => {
    require('whatwg-fetch');
  });
}

export { fetch };

export default function (endpoint, type, dataKey) {
  // dispatch and getState from redux-thunk

  return function (dispatch, getState) {
    dispatch({ type: type + '_REQUEST' });

    const { accessToken } = getState().auth;
    const options = {};
    if(accessToken) {
      options.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return fetch(endpoint, options)
      .then(response => response.json())
      .then(data => dispatch({ type: type + '_SUCCESS', [dataKey]: data }))
      .catch(error => dispatch({ type: type + '_FAILURE', error }));
  };
}
