import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import classes from './Feedback.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center'
  }
});

export default function HoverRating() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState('');
  const materialClasses = useStyles();

  return (
    <div className={classes.FeedbackScreen}>
      <Header />
      <div className={classes.Feedback}>
        <h1>Rate Us!</h1>
        <div
          className={[materialClasses.root, classes.StarsContainer].join(' ')}
        >
          <Rating
            name="hover-feedback"
            size="large"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {value !== null && (
            <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </div>
        <div className={classes.Comment}>
          <label>Feedback:</label>
          <textarea
            className={value === 0 ? classes.Disable : null}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button
          text="Submit"
          styles={{ margin: '20px auto' }}
          type={btnTypes.Button4}
          click={() => {}}
          disable={value === 0}
        />
      </div>
      <Footer />
    </div>
  );
}
