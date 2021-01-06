import React from 'react';

import classes from './InputsGroup.module.css';

const inputsGroup = (props) => {
  // console.log(props.inputsData);
  // console.log('-------------------------------------');
  return (
    <div className={classes.InputsGroup}>
      {props.inputsData.map((data) => (
        <div key={data.option} className={classes.InputContainer}>
          <input
            id={data.option}
            type={props.type}
            checked={data.isChecked}
            value={data.option}
            name={props.name}
            onChange={props.onChangeHandler}
          />
          <label htmlFor={data.option}>{data.option}</label>
        </div>
      ))}
    </div>
  );
};

export default inputsGroup;
