import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { Tabs } from 'react-md/lib/Tabs';

import { fetchCategories, fetchNewReleases } from 'actions/browse';
import CategoryTab from '../CategoryTab';
import PleaseLogin from 'components/PleaseLogin';

@connect(({ auth, browse }) => ({
  accessToken: auth.accessToken,
  categories: browse.categories.items,
  newReleases: browse.newReleases.items,
}), { fetchCategories, fetchNewReleases })
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    accessToken: PropTypes.string,
    categories: PropTypes.array.isRequired,
    newReleases: PropTypes.array.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchNewReleases: PropTypes.func.isRequired,
  };

  static defaultProps = {
    newReleases: [],
    categories: [],
  };

  componentDidMount() {
    const { accessToken, fetchCategories, fetchNewReleases } = this.props;
    if(accessToken) {
      fetchCategories();
      fetchNewReleases();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { accessToken, categories } = this.props;
    if(!accessToken) {
      return <PleaseLogin key="login" />;
    }

    let tabs;
    if(categories.length) {
      tabs = (
        <Tabs key="tabs" scrollable={true}>
          {categories.map(category => <CategoryTab key={category.id} {...category} />)}
        </Tabs>
      );
    }
    return <section>{tabs}</section>;
  }
}
