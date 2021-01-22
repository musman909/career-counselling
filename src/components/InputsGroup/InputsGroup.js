import React from 'react';

import classes from './InputsGroup.module.css';

const inputsGroup = (props) => {
  return (
    <div className={classes.InputsGroup}>
      {props.inputOptions.map((data) => (
        <div key={data.label} className={classes.InputContainer}>
          <input
            id={props.name + data.label}
            type={props.type}
            checked={data.isChecked}
            value={data.label}
            name={props.name}
            onChange={props.onChangeHandler}
          />
          <label htmlFor={props.name + data.label}>{data.label}</label>
        </div>
      ))}
    </div>
  );
};

export default inputsGroup;
