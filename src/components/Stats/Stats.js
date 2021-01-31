import React from 'react';

import classes from './Stats.module.css';
import Sparkline from '../Sparkline/Sparkline';

const Stats = (props) => {
  return (
    <div className={classes.Stats}>
      <h2>{props.title}</h2>
      <div>
        <Sparkline
          backgroundColor={props.sparklineColor}
          hoverBackgroundColor={props.sparklineHoverColor}
        />
        <p style={{ color: props.sparklineColor }}>{props.stats}</p>
      </div>
    </div>
  );
};

export default Stats;
