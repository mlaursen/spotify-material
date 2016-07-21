import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Tabs, Tab } from 'react-md/lib/Tabs';

export default class CategoryTabs extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    categories: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { categories, onChange } = this.props;
    return (
      <Tabs scrollable={true} style={{ overflowX: 'auto' }} onChange={onChange}>
        {categories.map(category => <Tab key={category.id} label={category.name} />)}
      </Tabs>
    );
  }
}
