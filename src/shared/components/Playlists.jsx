import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Link } from 'react-router';
import Avatar from 'react-md/lib/Avatars';
import { CardText } from 'react-md/lib/Cards';
import { List, ListItem } from 'react-md/lib/Lists';

export default class Playlists extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.shape({
        height: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
      })).isRequired,
      tracks: PropTypes.shape({
        href: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
    })).isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const playlists = this.props.items.map(playlist => {
      const { id, name, images } = playlist;
      let leftAvatar;
      if(images.length) {
        const img = images[images.length - 1];
        leftAvatar = <Avatar key="playlist-art" src={img.url} />;
      }

      return (
        <ListItem
          key={id}
          to={`/playlists/${id}`}
          component={Link}
          primaryText={name}
          leftAvatar={leftAvatar}
        />
      );
    });

    return (
      <CardText>
        <List subheader="Playlists">
          {playlists}
        </List>
      </CardText>
    );
  }
}
