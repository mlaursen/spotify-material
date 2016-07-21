import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import './_me.scss';
import { CardMedia, CardTitle } from 'react-md/lib/Cards';

export default class Me extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    images: PropTypes.array.isRequired,
  };

  static defaultProps = {
    id: '',
    images: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      id,
      displayName,
      email,
      images,
    } = this.props;

    const title = <CardTitle key="title" title={displayName || id} subtitle={email} />;

    let media;
    if(images.length) {
      media = <CardMedia key="media" overlay={title}><img src={images[0].url} /></CardMedia>;
    }

    return media ? media : title;
  }
}
