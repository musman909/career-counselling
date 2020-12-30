import React, { Component } from 'react';

import classes from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import UserInfo from '../../components/UserInfo/UserInfo';
import Footer from '../../components/Footer/Footer';

class Dashboard extends Component {
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
      <div className={classes.Dashboard}>
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
        <div className={classes.TestHistory}>
          <h2>Test History</h2>
          <table className={classes.TestHistoryTable}>
            <thead>
              <tr>
                <th>Test</th>
                <th>Date</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {this.state.testsHistory.map((test, index) => (
                <tr key={index}>
                  <td>{test.name}</td>
                  <td>{test.date}</td>
                  <td>
                    <a href={test.link}>View Result</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
