import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import moment from 'moment';

import './Review.css';
import classes from './Review.module.css';

import profileIcon from '../../assests/images/user2.png';

const durations = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds'
];

const Review = (props) => {
  const feedbackDate = moment(new Date(props.date));
  const currentDate = moment(new Date());

  let date = '';

  const duration = durations.find(
    (el) => currentDate.diff(feedbackDate, el) > 0
  );
  date = `${currentDate.diff(feedbackDate, duration)} ${duration} ago`;

  return (
    <div id="ReviewScreen" className={classes.ReviewScreen}>
      <img src={profileIcon} alt="Profile" className={classes.ProfileIcon} />
      <div className={classes.Review}>
        <h4>{props.name}</h4>
        <div className={classes.Rating}>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="half-rating-read"
              value={props.rating}
              precision={0.5}
              readOnly
            />
          </Box>
          <p className={classes.Date}>{date}</p>
        </div>
        <p className={classes.Feedback}>{props.feedback}</p>
      </div>
    </div>
  );
};

export default Review;
