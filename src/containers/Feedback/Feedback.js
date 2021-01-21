import React, { Component } from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import classes from './Feedback.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
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

class Feedback extends Component {
  state = {
    value: 0,
    hover: -1,
    comment: ''
  };

  render() {
    return (
      <div className={classes.FeedbackScreen}>
        <Header />
        <div className={classes.Feedback}>
          <Heading label="Rate Us" title="Rate Our Test" />
          <div className={classes.RatingContainer}>
            <Rating
              name="hover-feedback"
              size="large"
              value={this.state.value}
              precision={0.5}
              onChange={(event, newValue) => {
                this.setState({ value: newValue });
              }}
              onChangeActive={(event, newHover) => {
                this.setState({ hover: newHover });
              }}
            />
            {this.state.value !== null && (
              <Box ml={2}>
                {
                  labels[
                    this.state.hover !== -1
                      ? this.state.hover
                      : this.state.value
                  ]
                }
              </Box>
            )}
          </div>
          <div className={classes.Comment}>
            <label>Your Feedback:</label>
            <textarea
              className={this.state.value === 0 ? classes.Disable : null}
              value={this.state.comment}
              onChange={(e) => this.setState({ comment: e.target.value })}
            />
          </div>
          <Button
            text="Submit"
            styles={{ margin: '20px auto' }}
            type={btnTypes.Button4}
            click={() => {}}
            disable={this.state.value === 0}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Feedback;
