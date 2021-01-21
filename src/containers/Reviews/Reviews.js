import React, { Component } from 'react';

import classes from './Reviews.module.css';
import Review from '../../components/Review/Review';
import Header from '../../components/Header/Header';
import Heading from '../../components/Heading/Heading';
import Footer from '../../components/Footer/Footer';

class Reviews extends Component {
  render() {
    return (
      <div className={classes.ReviewsScreen}>
        <Header />
        <div className={classes.Reviews}>
          <Heading label="reviews" title="User Reviews" />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Reviews;
