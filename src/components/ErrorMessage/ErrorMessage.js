import React from 'react';

import classes from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
  return <p className={classes.ErrorMessage}>{props.error}</p>;
};

export default ErrorMessage;
