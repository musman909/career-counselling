import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import classes from './Review.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import profileIcon from '../../assests/images/profile-icon.jpg';

const Review = () => {
  return (
    <div className={classes.ReviewScreen}>
      <img src={profileIcon} alt="" className={classes.Icon} />
      <div className={classes.Review}>
        <h4>Smion Liu</h4>
        <div className={classes.Rating}>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="read-only" value={4} readOnly />
          </Box>
          <p className={classes.Date}>5 months ago</p>
        </div>
        <p className={classes.Comment}>
          Although this class says "From Zero to Expert", but it confuse
          beginner alot! You should pay attention either to beginner or expert,
          not both! To beginner, some of your class got 29 minutes long, that is
          not good for learning and understanding, also your explanation is
          really tedious and losing the point.
        </p>
      </div>
    </div>
  );
};

export default Review;
