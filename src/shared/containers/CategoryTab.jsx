import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { Tab } from 'react-md/lib/Tabs';

import { fetchCategoryPlaylists } from 'actions/browse';
@connect((state, props) => ({
  category: state.browse.categories[props.id],
}), { fetchCategoryPlaylists })
export default class CategoryTab extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    fetchCategoryPlaylists: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icons: PropTypes.array.isRequired,
    category: PropTypes.object.isRequired,
    href: PropTypes.string.isRequired,
  };

  static defaultProps = {
    category: {},
  };

  componentWillMount() {
    this.props.fetchCategoryPlaylists(this.props.id, this.props.href);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { name, onChange, checked } = this.props;
    return (
      <Tab label={name} checked={checked} onChange={onChange} />
    );
  }
}
