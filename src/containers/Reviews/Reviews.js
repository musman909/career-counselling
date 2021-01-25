import React, { Component } from 'react';
import axios from 'axios';

import classes from './Reviews.module.css';
import Review from '../../components/Review/Review';
import Header from '../../components/Header/Header';
import Heading from '../../components/Heading/Heading';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

class Reviews extends Component {
  state = {
    reviews: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await axios.post('/api/getUsersReviews');
      if (response.status !== 200) {
        throw new Error('Something went wrong while fetching reviews!');
      }

      this.setState({ reviews: response.data, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }
  render() {
    let reviewsScreen = <Spinner />;

    if (!this.state.loading) {
      let reviews = null;
      if (this.state.error) {
        reviews = <ErrorMessage error={this.state.error} />;
      } else {
        reviews = (
          <React.Fragment>
            <Heading label="reviews" title="User Reviews" />
            <ul>
              {this.state.reviews.map((review, index) => (
                <li key={index}>
                  <Review {...review} />
                </li>
              ))}
            </ul>
          </React.Fragment>
        );
      }
      reviewsScreen = (
        <div className={classes.ReviewsScreen}>
          <Header />
          <div className={classes.Reviews}>{reviews}</div>
          <Footer />
        </div>
      );
    }

    return reviewsScreen;
  }
}

export default Reviews;
