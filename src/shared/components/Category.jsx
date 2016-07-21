import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Card, CardMedia, CardTitle } from 'react-md/lib/Cards';

export default class Category extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icons: PropTypes.array.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { icons, name } = this.props;
    const [{ url }] = icons;

    return (
      <Card>
        <CardMedia overlay={<CardTitle title={name} />} forceAspect={false}>
          <img src={url} />
        </CardMedia>
      </Card>
    );
  }
}
