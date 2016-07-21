import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import { Card, CardText } from 'react-md/lib/Cards';

export default class Login extends Component {
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
        <CardText>
          Hello, World!
        </CardText>
      </Card>
    );
  }
}
