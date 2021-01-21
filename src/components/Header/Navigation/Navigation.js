import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  let navClasses = [classes.Navigation];
  if (props.showNavigation) {
    navClasses.push(classes.ShowNavigation);
  }
  return (
    <nav className={navClasses.join(' ')}>
      <ul>
        {props.navLinks.map((navlink) => (
          <li key={navlink.title} className={classes.NavItem}>
            <NavLink to={navlink.link}>{navlink.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
