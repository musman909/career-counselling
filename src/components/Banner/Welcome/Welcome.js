import React from 'react';

import classes from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={classes.Welcome}>
      <h1 className={classes.Heading}>Welcome</h1>
      <p className={classes.Message}>
        We offer services for you to select the right career, this platform will
        help you explorer your hidden talent and reccommed you what's career is
        most suitable for you.
      </p>
      <button className={classes.Button}>Register</button>
    </div>
  );
};

export default Welcome;
