import React, { Component } from 'react';

import { connect } from 'react-redux';

import classes from './Header.module.css';
import Navigation from './Navigation/Navigation';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

class Header extends Component {
  state = {
    showNav: false
  };

  showNavHandler = () => {
    this.setState((prevState) => ({
      showNav: !prevState.showNav
    }));
  };
  render() {
    let hamburgerClasses = [classes.Hamburger];
    if (this.state.showNav) {
      hamburgerClasses.push(classes.SlideHamburger);
    }
    return (
      <div className={classes.Header}>
        <button
          className={hamburgerClasses.join(' ')}
          onClick={this.showNavHandler}
        >
          <span
            className={this.state.showNav ? classes.ToggleHamburger : null}
          ></span>
        </button>
        <h1 className={classes.Title}>
          <span>Career</span> Consueling
        </h1>
        <Navigation
          navLinks={this.props.navLinks}
          showNavigation={this.state.showNav}
        />
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
