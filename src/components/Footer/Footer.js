import React from 'react';

import colors from '../../constants/colors';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <h1>
        Career <span>Consueling</span>
      </h1>
      <p className={classes.Slogan}>Find your destination with us</p>
      <p className={classes.Copyright}>
        © Copyright <span>Career Consueling</span>. All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
