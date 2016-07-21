import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';

export default class PleaseLogin extends Component {
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
      <Card>
        <CardTitle title="Please Login" />
        <CardText>
          <a href="/auth/spotify">Please login with Spotify to access stuff</a>
        </CardText>
      </Card>
    );
  }
}
