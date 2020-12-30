import React, { Component } from 'react';

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
          styles={{ background: 'rgb(199, 109, 21)', color: '#ffffff' }}
          text={props.submitBtnText}
          type={btnTypes.submit}
          click={props.formSubmitHandler}
        />
        <Button text="Cancel" type={btnTypes.cancel} click={() => {}} />
      </div>
    </form>
  );
};

export default form;
