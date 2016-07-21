import React, { Component, PropTypes, cloneElement } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';

import FontIcon from 'react-md/lib/FontIcons';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import { clearAuth } from 'actions/auth';
import { fetchCategories } from 'actions/browse';
import fetch from 'utils/fetch';
import Category from 'components/Category';

@withRouter
@connect(({ auth, browse }) => ({
  accessToken: auth.accessToken,
  refreshToken: auth.refreshToken,
  nextCategoryUrl: browse.categories.next,
  categories: browse.categories.items,
}), { clearAuth, fetchCategories, fetch })
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object.isRequired,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    router: PropTypes.object.isRequired,
    clearAuth: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    nextCategoryUrl: PropTypes.string,
    fetch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if(this.props.location.pathname === '/' && this.props.accessToken && !this.props.categories.length) {

      this.props.fetchCategories();
    }
  }

  componentWillUpdate({ accessToken, location, categories, fetchCategories }) {
    if(this.props.location.pathname === location.pathname || location.pathname !== '/' || !accessToken) {
      return;
    }

    if(!categories.length) {
      fetchCategories();
    }
  }

  _fetchNextCategories = () => {
    this.props.fetch(this.props.nextCategoryUrl, 'FETCH_CATEGORIES', 'categories');
  };

  _logout = () => {
    this.props.clearAuth();
    this.props.router.push('/');
  };

  render() {
    const { children, location: { pathname }, accessToken, categories, nextCategoryUrl } = this.props;

    const navItems = [{
      to: '/',
      key: 'home',
      component: Link,
      primaryText: 'Home',
      activeClassName: 'active',
      leftIcon: <FontIcon>home</FontIcon>,
    }];

    if(!accessToken) {
      navItems.push({
        href: '/auth/spotify',
        key: 'login',
        component: 'a',
        primaryText: 'Login',
        activeClassName: 'active',
        leftIcon: <FontIcon>input</FontIcon>,
      });
    } else {
      navItems.push({
        to: '/account',
        key: 'account',
        component: Link,
        primaryText: 'Account',
        activeClassName: 'active',
        leftIcon: <FontIcon>person</FontIcon>,
      });

      navItems.push({
        to: '/playlists',
        key: 'playlists',
        component: Link,
        primaryText: 'Playlists',
        activeClassName: 'active',
        leftIcon: <FontIcon>featured_play_list</FontIcon>,
      });

      navItems.push({
        key: 'logout',
        primaryText: 'Logout',
        leftIcon: <FontIcon>eject</FontIcon>,
        onClick: this._logout,
      });
    }

    let toolbarChildren, drawerChildren;
    if(pathname === '/' && categories.length) {
      drawerChildren = categories.map(category => (
        <Category key={category.id} {...category} />
      ));

      if(nextCategoryUrl) {
        drawerChildren.push(<Waypoint key="waypoint" onEnter={this._fetchNextCategories} />);
      }

      drawerChildren = <div key="categories" className="md-card-list">{drawerChildren}</div>;
    } else if(pathname !== '/' && children) {
      drawerChildren = cloneElement(children, { key: pathname });
    }

    return (
      <NavigationDrawer
        drawerTitle="Spotify"
        navItems={navItems}
        toolbarTitle={pathname.replace('/', '').split('/')[0] || 'Home'}
        toolbarChildren={toolbarChildren}
        desktopDrawerType={NavigationDrawer.DrawerType.PERSISTENT}
      >
        {drawerChildren}
      </NavigationDrawer>
    );
  }
}
