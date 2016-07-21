import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { setAuth } from '../actions/auth';
import { fetchMe } from '../actions/account';

@withRouter
@connect(() => ({}), { setAuth, fetchMe })
export default class Auth extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    params: PropTypes.shape({
      refreshToken: PropTypes.string.isRequired,
      accessToken: PropTypes.string.isRequired,
    }).isRequired,
    setAuth: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    fetchMe: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { setAuth, params: { accessToken, refreshToken }, router, fetchMe } = this.props;
    setAuth(accessToken, refreshToken);
    fetchMe();
    router.replace('/account');
  }

  render() {
    return (
      <div />
    );
  }
}
