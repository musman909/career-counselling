import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Home.module.css';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

import img1 from '../../assests/images/complete-the-test.svg';
import img2 from '../../assests/images/view-detailed results.svg';
import img3 from '../../assests/images/unlock-your potential.svg';
import Card from '../../components/Card/Card';

class Home extends Component {
  state = {
    userInfos: [
      {
        label: 'Name',
        data: 'Usman Shahid'
      },
      {
        label: 'Email',
        data: 'usmanar839@gmail.com'
      },
      {
        label: 'Status',
        data: 'Intermediate Student'
      },
      {
        label: 'Phone',
        data: '03XX-XXXXXXX'
      }
    ],

    testsHistory: [
      {
        name: 'Test 1',
        date: new Date().toString(),
        link: '/'
      },
      {
        name: 'Test 1',
        date: new Date().toString(),
        link: '/'
      }
    ]
  };
  render() {
    return (
      <div className={classes.Home}>
        <Header navLinks={this.props.navLinks} />
        <Banner />
        <div className={classes.CardsContainer}>
          <h1>Free Career Selection Test</h1>
          {/* <Heading label="About" title="About Us" /> */}
          <div className={classes.Cards}>
            <Card
              icon={img1}
              title="Complete the Test"
              data="Be yourself and answer honestly to find out your personality type."
            />
            <Card
              icon={img2}
              title="View Detailed Results"
              data="Learn how your personality type influences many areas of your life.
"
            />
            <Card
              icon={img3}
              title="Unlock Your Potential"
              data="Grow into the person you want to be with your optional Premium Profile."
            />
          </div>
        </div>

        <div className={classes.About}>
          <h2>About Us</h2>
          {/* <Heading label="About" title="About Us" /> */}
          <p>
            In our society there’s a major lack of counseling, because of this
            reason many students selects wrong professions and after some time
            they realize and leave it or pursue it by considering it as an
            unfortunate decision through this way they can’t live their life
            successfully and live a life of a common man due to their unknown
            abilities.
          </p>
          <Button text="Learn More" type={btnTypes.Button6} click={() => {}} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);
