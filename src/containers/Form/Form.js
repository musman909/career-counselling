import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Form.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

const form = (props) => {
  return (
    <form className={classes.Form}>
      {props.userData.map((data) => (
        <Input
          key={data.id}
          {...data}
          onChange={props.onInputChange}
          validateInput={props.validateInput}
        />
      ))}

      <div className={classes.BtnsContainer}>
        <Button
          text={props.submitBtnText}
          type={btnTypes.Button4}
          click={props.formSubmitHandler}
        />
        <Button
          text="Cancel"
          type={btnTypes.Button2}
          click={() => {
            props.history.push('/');
          }}
        />
      </div>
    </form>
  );
};

export default withRouter(form);
