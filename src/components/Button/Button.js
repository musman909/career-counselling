import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      style={{ ...props.styles }}
      className={[classes.Btn, classes[props.type]].join(' ')}
      onClick={props.click}
    >
      {props.text}
    </button>
  );
};

export default Button;
