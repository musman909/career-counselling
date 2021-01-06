import React from 'react';

import { connect } from 'react-redux';

import Swiper from 'react-id-swiper';
import 'swiper/swiper-bundle.min.css';

import './Banner.css';

import slider1 from '../../assests/images/slider1.jpeg';
import slider2 from '../../assests/images/slider2.jpeg';
import slider3 from '../../assests/images/slider3.jpeg';
import slider4 from '../../assests/images/slider4.jpeg';
import slider5 from '../../assests/images/slider5.jpeg';
import slider6 from '../../assests/images/slider6.jpeg';
import Welcome from './Welcome/Welcome';

// Params definition
const params = {
  autoHeight: true, //enable auto height

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  spaceBetween: 0,
  loop: true,
  autoplay: true
  // allowTouchMove: false
};

const Banner = (props) => {
  return (
    <div id="Banner" style={{ position: 'relative' }}>
      {!props.isAuth ? <Welcome /> : null}
      <Swiper {...params}>
        <div style={{ backgroundImage: 'url(./' + slider1 + ')' }}></div>
        <div style={{ backgroundImage: 'url(./' + slider2 + ')' }}></div>
        <div style={{ backgroundImage: 'url(./' + slider3 + ')' }}></div>
        <div style={{ backgroundImage: 'url(./' + slider4 + ')' }}></div>
        <div style={{ backgroundImage: 'url(./' + slider5 + ')' }}></div>
        <div style={{ backgroundImage: 'url(./' + slider6 + ')' }}></div>
      </Swiper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps, null)(Banner);
