import React from 'react';

import classes from './Navigation.module.css';
import Navlink from './Navlink/Navlink';

const Navigation = (props) => {
  return (
    <nav className={classes.Navigation}>
      <ul>
        {props.navLinks.map((navlink) => (
          <li key={navlink.title} className={classes.NavItem}>
            <Navlink title={navlink.title} link={navlink.link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
