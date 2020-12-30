import React from 'react';

import classes from './Navlink.module.css';

const Navlink = (props) => {
  return (
    <a className={classes.Navlink} href={props.link}>
      {props.title}
    </a>
  );
};

export default Navlink;
