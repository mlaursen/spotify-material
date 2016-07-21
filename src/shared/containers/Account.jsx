import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import { fetchMe, fetchTopTracks, fetchTopArtists, fetchPlaylists } from '../actions/account';
import { Card } from 'react-md/lib/Cards';

import Me from '../components/Me';
import TopTracks from '../components/TopTracks';
import TopArtists from '../components/TopArtists';
import Playlists from '../components/Playlists';

@connect(({ account }) => account, {
  fetchMe,
  fetchTopTracks,
  fetchTopArtists,
  fetchPlaylists,
})
export default class Account extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    fetchMe: PropTypes.func.isRequired,
    fetchTopTracks: PropTypes.func.isRequired,
    fetchTopArtists: PropTypes.func.isRequired,
    fetchPlaylists: PropTypes.func.isRequired,
    fetchingMe: PropTypes.bool.isRequired,
    me: PropTypes.object.isRequired,
    fetchingTracks: PropTypes.bool.isRequired,
    topTracks: PropTypes.object.isRequired,
    fetchingArtists: PropTypes.bool.isRequired,
    topArtists: PropTypes.object.isRequired,
    fetchingPlaylists: PropTypes.bool.isRequired,
    playlists: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchMe, fetchTopTracks, fetchTopArtists, fetchPlaylists } = this.props;
    fetchMe();
    fetchTopTracks();
    fetchTopArtists();
    fetchPlaylists();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { me, topTracks, topArtists, playlists } = this.props;

    return (
      <Card className="me">
        <Me {...me} />
        <TopTracks {...topTracks} />
        <TopArtists {...topArtists} />
        <Playlists {...playlists} />
      </Card>
    );
  }
}
