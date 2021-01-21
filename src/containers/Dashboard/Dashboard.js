import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Dashboard.module.css';
import Header from '../../components/Header/Header';
// import Banner from '../../components/Banner/Banner';
import UserInfo from '../../components/UserInfo/UserInfo';
import Heading from '../../components/Heading/Heading';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

class Dashboard extends Component {
  state = {
    userInfos: null,

    testsHistory: [
      {
        name: 'Test 1',
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        link: '/'
      },
      {
        name: 'Test 1',
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        link: '/'
      }
    ]
  };

  componentDidMount() {
    const userInfo = { ...this.props.activeUserData };
    userInfo['tests'] = 2;
    this.setState({ userInfo });
  }

  render() {
    const transformedUserInfo = [];
    for (const key in this.state.userInfo) {
      transformedUserInfo.push({
        label: key,
        value: this.props.activeUserData[key]
      });
    }

    let dashboard = <Spinner />;
    if (this.state.userInfo) {
      let testsHistoryTable = (
        <div
          style={{
            width: '100%',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px 0',
            border: '1px solid #eee'
          }}
        >
          <p style={{ fontSize: '18px', textTransform: 'uppercase' }}>
            No record found!
          </p>
        </div>
      );

      if (this.state.userInfo.tests > 0) {
        testsHistoryTable = (
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
                    <Link to={`/view-result/${index}`}>View Result</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      dashboard = (
        <div className={classes.Dashboard}>
          <Header navLinks={this.props.navLinks} isAuth={true} />
          <div className={classes.UserProfile}>
            <Heading label="profile" title="Profile Information" />
            <div className={classes.ProfileInfo}>
              {transformedUserInfo.map((info) => (
                <UserInfo
                  key={info.label}
                  label={info.label}
                  value={info.value}
                />
              ))}
            </div>
          </div>
          <div className={classes.Hr}></div>
          <div className={classes.TestHistory}>
            <Heading label="test" title="Test History" />
            {testsHistoryTable}
          </div>
          <div className={classes.Banner}>
            <div>
              <h2>Rate Our Test</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <Button
              text="Rate Us"
              type={btnTypes.Button6}
              styles={{
                textTransform: 'uppercase',
                fontWeight: '600',
                fontSize: '15px',
                padding: '10px 50px',
                borderRadius: '25px'
              }}
            />
          </div>
          <Footer />
        </div>
      );
    }

    return dashboard;
  }
}

const mapStateToProps = (state) => {
  return {
    activeUserEmail: state.activeUser,
    activeUserData: state.userData
  };
};

export default connect(mapStateToProps, null)(Dashboard);
