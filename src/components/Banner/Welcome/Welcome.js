import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Welcome.module.css';
import Button from '../../Button/Button';
import btnTypes from '../../../constants/btnTypes';

const Welcome = (props) => {
  return (
    <div className={classes.Welcome}>
      <h1 className={classes.Heading}>Welcome</h1>
      <p className={classes.Message}>
        We offer services for you to select the right career, this platform will
        help you explorer your hidden talent and reccommed you what's career is
        most suitable for you.
      </p>
      <Button
        styles={{
          display: 'block',
          width: '200px',
          border: '0',
          margin: 'auto'
        }}
        text="Register"
        type={btnTypes.Button5}
        click={() => {
          props.history.push('/register');
        }}
      />
    </div>
  );
};

export default withRouter(Welcome);
