import React from 'react';

import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {' '}
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
