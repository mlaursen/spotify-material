import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import { fetchPlaylist } from 'actions/playlists';

@connect(({ playlists }, { params }) => ({
  playlist: playlists[params.playlistId],
}), {
  fetchPlaylist,
})
export default class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    params: PropTypes.shape({
      playlistId: PropTypes.string.isRequired,
    }).isRequired,
    fetchPlaylist: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
  };

  static defaultProps = {
    playlist: {},
  };

  componentWillMount() {
    this.props.fetchPlaylist(this.props.params.playlistId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    console.log('this.props:', this.props);
    return (
      <div />
    );
  }
}
