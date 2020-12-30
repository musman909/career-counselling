import React from 'react';

import classes from './Header.module.css';
import Logo from './Title/Title';
import Navigation from './Navigation/Navigation';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <Logo />
      <Navigation navLinks={props.navLinks} />
      {props.isAuth ? <ProfileIcon /> : null}
    </div>
  );
};

export default Header;
