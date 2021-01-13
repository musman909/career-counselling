import React, { Component } from 'react';

import Review from '../../components/Review/Review';

class Reviews extends Component {
  render() {
    return (
      <div>
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    );
  }
}

export default Reviews;
