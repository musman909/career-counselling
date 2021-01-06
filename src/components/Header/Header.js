import React, { Component } from 'react';

import { connect } from 'react-redux';

import classes from './Header.module.css';
import Logo from './Title/Title';
import Navigation from './Navigation/Navigation';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

class Header extends Component {
  render() {
    return (
      <div className={classes.Header}>
        <Logo />
        <Navigation navLinks={this.props.navLinks} />
        {this.props.isAuth ? <ProfileIcon /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    navLinks: state.isAuth ? state.userNavLinks : state.homeNavLinks
  };
};

export default connect(mapStateToProps)(Header);
