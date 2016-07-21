import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { store, ...props } = this.props;
    return (
      <Provider store={store}>
        <Router {...props} />
      </Provider>
    );
  }
}
