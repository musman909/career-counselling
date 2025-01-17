import React from 'react';

import classes from './UserInfo.module.css';

const UserInfo = (props) => {
  return (
    <div className={classes.UserInfo}>
      <p className={classes.Label}>{props.label}:</p>
      <p className={classes.Value}>{props.value}</p>
    </div>
  );
};

export default UserInfo;
