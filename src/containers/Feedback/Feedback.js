import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import moment from 'moment';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import classes from './Feedback.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
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
    rating: 0,
    hover: -1,
    feedback: '',
    isFeedbackFound: false,
    loading: true,
    error: false
  };

  async componentDidMount() {
    const formData = new FormData();
    formData.append('email', this.props.userData.email);
    try {
      const response = await axios.post('/api/getFeedback', formData);
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      const resData = response.data;

      if (
        !(Object.keys(resData).length === 0 && resData.constructor === Object)
      ) {
        this.setState({
          rating: resData.rating,
          feedback: resData.feedback,
          isFeedbackFound: true
        });
      }
    } catch (err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  }

  submitFeedbackHandler = async () => {
    const formData = new FormData();
    formData.append('email', this.props.userData.email);
    formData.append('rating', this.state.rating);
    formData.append('feedback', this.state.feedback);
    formData.append('date', moment(new Date()));

    try {
      let response = null;
      if (this.state.isFeedbackFound) {
        response = await axios.post('/api/updateFeedback', formData);
      } else {
        response = await axios.post('/api/saveFeedback', formData);
      }
      if (response.status !== 200) {
        throw new Error('Something went wrong while storing review!');
      }

      this.props.history.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  render() {
    console.log(this.state);
    let feedbackScreen = <Spinner />;
    if (!this.state.loading) {
      let feedback = null;

      if (this.state.error) {
        feedback = <ErrorMessage error={this.state.error} />;
      } else {
        feedback = (
          <React.Fragment>
            <Heading label="Rate Us" title="Rate Us" />
            <div className={classes.RatingContainer}>
              <Rating
                name="hover-feedback"
                size="large"
                value={this.state.rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  this.setState({ rating: newValue });
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
                        : this.state.rating
                    ]
                  }
                </Box>
              )}
            </div>
            <div className={classes.Comment}>
              <label>Your Feedback:</label>
              <textarea
                className={this.state.rating === 0 ? classes.Disable : null}
                value={this.state.feedback}
                onChange={(e) => this.setState({ feedback: e.target.value })}
              />
            </div>
            <Button
              text={this.state.isFeedbackFound ? 'Update' : 'Submit'}
              styles={{ margin: '20px auto' }}
              type={btnTypes.Button4}
              click={this.submitFeedbackHandler}
              disable={this.state.rating === 0}
            />
          </React.Fragment>
        );
      }

      feedbackScreen = (
        <div className={classes.FeedbackScreen}>
          <Header />
          <div className={classes.Feedback}>{feedback}</div>
          <Footer />
        </div>
      );
    }
    return feedbackScreen;
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps, null)(withRouter(Feedback));
