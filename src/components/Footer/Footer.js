import React from 'react';

import colors from '../../constants/colors';

const Footer = () => {
  return (
    <div
      style={{
        background: colors.darkorange,
        color: colors.white,
        textAlign: 'center',
        padding: '30px 0'
      }}
    >
      Copyright &copy; by{' '}
      <span style={{ color: colors.darkbrown }}>
        <strong>Career Consueling</strong>
      </span>
      , 2020
    </div>
  );
};

export default Footer;
