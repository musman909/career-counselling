import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import * as actionTypes from '../../store/actions';

import classes from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import UserInfo from '../../components/UserInfo/UserInfo';
import Heading from '../../components/Heading/Heading';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import btnTypes from '../../constants/btnTypes';

class Dashboard extends Component {
  state = {
    userInfo: null,
    testsHistory: [],
    loading: true,
    error: null
  };

  async componentDidMount() {
    await this.fetchUserData();
  }

  // componentDidUpdate() {
  //   this.fetchUserData();
  // }

  fetchUserData = async () => {
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('email', this.props.userEmail);
    console.log('User Email:', this.props.userEmail);
    try {
      const response = await axios.post('/api/getUserProfileData', formData);
      if (response.status !== 200) {
        throw new Error('Something went wrong while fetching data');
      }
      this.props.setUserProfileData(response.data.profile);
      this.props.setUserTestsData(response.data.tests);

      const userInfo = { ...this.props.userData };
      const testsHistory = this.props.testsData;
      userInfo['tests'] = this.props.testsData.length;

      this.setState({ userInfo, testsHistory, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  render() {
    console.log(this.state);
    let dashboardScreen = <Spinner />;

    if (!this.state.loading) {
      let dashboard = null;
      if (this.state.error) {
        dashboard = <ErrorMessage error={this.state.error} />;
      } else {
        const transformedUserInfo = [];
        for (const key in this.state.userInfo) {
          transformedUserInfo.push({
            label: key,
            value: this.state.userInfo[key]
          });
        }

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

        if (this.state.testsHistory.length > 0) {
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
                      <Link to={`/view-test-result/${index}`}>View Result</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }

        dashboard = (
          <React.Fragment>
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
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
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
                click={() => this.props.history.push('/feedback')}
              />
            </div>
          </React.Fragment>
        );
      }

      dashboardScreen = (
        <div className={classes.DashboardScreen}>
          <Header navLinks={this.props.navLinks} isAuth={true} />
          <div className={classes.Dashboard}>{dashboard}</div>
          <Footer />
        </div>
      );
    }

    return dashboardScreen;
  }
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.activeUser,
    userData: state.userData,
    testsData: state.testsData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserProfileData: (userData) => {
      dispatch({ type: actionTypes.SET_PROFILE_DATA, userData });
    },

    setUserTestsData: (testsData) => {
      dispatch({ type: actionTypes.SET_TESTS_DATA, testsData });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
