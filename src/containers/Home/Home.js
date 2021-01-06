import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Home.module.css';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import UserInfo from '../../components/UserInfo/UserInfo';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

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
        <div className={classes.UserProfile}>
          <h2>Profile Information</h2>
          <div className={classes.ProfileInfo}>
            {this.state.userInfos.map((info) => (
              <UserInfo key={info.label} label={info.label} data={info.data} />
            ))}
          </div>
        </div>
        <div className={classes.Hr}></div>
        <div className={classes.About}>
          <h2>About</h2>
          <p>
            In our society there’s a major lack of counseling, because of this
            reason many students selects wrong professions and after some time
            they realize and leave it or pursue it by considering it as an
            unfortunate decision through this way they can’t live their life
            successfully and live a life of a common man due to their unknown
            abilities.
          </p>
          <Button
            text="Learn More"
            type={btnTypes.Button1}
            click={() => {
              this.props.history.push('/about');
            }}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);
