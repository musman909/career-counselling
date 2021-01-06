import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navlink.module.css';

const Navlink = (props) => {
  return (
    <NavLink to={props.link} className={classes.Navlink}>
      {props.title}
    </NavLink>
  );
};

export default Navlink;
