import React from 'react';

import classes from './Heading.module.css';

const Heading = (props) => {
  return (
    <div className={classes.Heading}>
      <div className={classes.Label}>
        <p>{props.label}</p>
        <span></span>
      </div>
      <h2 className={classes.Title}>{props.title}</h2>
    </div>
  );
};

export default Heading;
