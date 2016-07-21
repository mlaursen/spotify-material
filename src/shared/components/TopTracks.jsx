import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class TopTracks extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div />
    );
  }
}
