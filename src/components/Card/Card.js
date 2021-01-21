import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div className={classes.Card}>
      <img className={classes.Icon} src={props.icon} alt="" />
      <h2>{props.title}</h2>
      <p>{props.data}</p>
    </div>
  );
};

export default Card;
