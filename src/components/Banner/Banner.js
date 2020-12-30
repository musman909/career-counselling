import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import './Banner.css';

import slider1 from '../../assests/images/slider1.jpeg';
import slider2 from '../../assests/images/slider2.jpeg';
import slider3 from '../../assests/images/slider3.jpeg';
import slider4 from '../../assests/images/slider4.jpeg';
import slider5 from '../../assests/images/slider5.jpeg';
import slider6 from '../../assests/images/slider6.jpeg';
import Welcome from './Welcome/Welcome';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Banner = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Welcome />
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <div style={{ backgroundImage: 'url(./' + slider1 + ')' }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundImage: 'url(./' + slider2 + ')' }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundImage: 'url(./' + slider3 + ')' }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundImage: 'url(./' + slider4 + ')' }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundImage: 'url(./' + slider5 + ')' }}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundImage: 'url(./' + slider6 + ')' }}></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
