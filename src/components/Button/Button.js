import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  let btnClasses = [classes.Btn];
  if (props.type) {
    btnClasses.push(classes[props.type]);
  }
  if (props.disable) {
    btnClasses.push(classes.Disable);
  }
  return (
    <button
      style={{ ...props.styles }}
      className={btnClasses.join(' ')}
      onClick={props.click}
      disabled={props.disable}
    >
      {props.text}
    </button>
  );
};

export default Button;
