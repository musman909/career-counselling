import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import classes from './AdminDashboard.module.css';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Stats from '../../../components/Stats/Stats';
import CustomTable from '../../../components/CustomTable/CustomTable';
import Review from '../../../components/Review/Review';
import Button from '../../../components/Button/Button';
import Spinner from '../../../components/Spinner/Spinner';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import btnTypes from '../../../constants/btnTypes';

class AdminDashboard extends Component {
  state = {
    loading: true,
    error: null
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await axios.post('/api/getAdminDashboardData');
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      const resData = response.data;
      this.setState({ ...resData, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    // console.log(this.state);

    let adminDashboardScreen = <Spinner />;

    if (!this.state.loading) {
      let adminDashboard = null;
      if (this.state.error) {
        adminDashboard = <ErrorMessage error={this.state.error} />;
      } else {
        adminDashboard = (
          <React.Fragment>
            <div className={classes.StatsContainer}>
              <Stats
                title="registered users"
                stats={this.state.usersCount}
                sparklineColor="rgb(122, 206, 76)"
                sparklineHoverColor="rgba(122, 206, 76, 0.5)"
              />
              <Stats
                title="test attempts"
                stats={this.state.testsCount}
                sparklineColor="rgb(112, 124, 210)"
                sparklineHoverColor="rgba(112, 124, 210, 0.5)"
              />
              <Stats
                title="total reviews"
                stats={this.state.reviewsCount}
                sparklineColor="rgb(44, 171, 227)"
                sparklineHoverColor="rgba(44, 171, 227, 0.5)"
              />
              <Stats
                title="banned users"
                stats="0"
                sparklineColor="rgb(239, 102, 3)"
                sparklineHoverColor="rgba(239, 102, 3, 0.5)"
              />
            </div>
            <div className={classes.LineChartContainer}>
              <h1 className={classes.Title}>Users Statistics</h1>
              <div>
                <Line
                  width={400}
                  height={500}
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                      {
                        label: 'Registered Users',
                        data: [33, 53, 85, 41, 44, 65],
                        fill: false,
                        backgroundColor: 'rgba(122, 206, 76, 0.1)',
                        borderColor: 'rgb(122, 206, 76)'
                      },
                      {
                        label: 'Tests Taken',
                        data: [33, 25, 35, 51, 54, 76],
                        fill: false,
                        backgroundColor: 'rgba(112, 124, 210, 0.1)',
                        borderColor: 'rgb(112, 124, 210)'
                      },
                      {
                        label: 'Reviews Posted',
                        data: [22, 10, 26, 80, 45, 30],
                        fill: false,
                        backgroundColor: 'rgba(239, 102, 3, 0.1)',
                        borderColor: 'rgb(239, 102, 3)'
                      }
                    ]
                  }}
                  options={{
                    plugins: {},
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    }
                  }}
                />
              </div>
            </div>

            <div className={classes.Table}>
              <h1 className={classes.Title}>recent registered users</h1>
              <CustomTable tableData={this.state.users} />
              {this.state.usersCount > 10 ? (
                <Button
                  text="Show All"
                  type={btnTypes.Button7}
                  styles={{
                    fontSize: '12px',
                    margin: '20px auto 0 auto',
                    border: '1px solid #797979',
                    color: '#797979'
                  }}
                  click={() => {}}
                />
              ) : null}
            </div>

            <div className={classes.Table}>
              <h1 className={classes.Title}>recent attempted tests</h1>
              <CustomTable tableData={this.state.tests} />
              {this.state.testsCount > 10 ? (
                <Button
                  text="Show All"
                  type={btnTypes.Button7}
                  styles={{
                    fontSize: '12px',
                    margin: '20px auto 0 auto',
                    border: '1px solid #797979',
                    color: '#797979'
                  }}
                  click={() => {}}
                />
              ) : null}
            </div>
            <div className={classes.Reviews}>
              <h1 className={classes.Title}>recent comments</h1>
              <ul>
                {this.state.reviews.map((review, index) => (
                  <li key={index}>
                    <Review {...review} />
                  </li>
                ))}
              </ul>
              {this.state.reviewsCount > 10 ? (
                <Button
                  text="Show All"
                  type={btnTypes.Button7}
                  styles={{
                    fontSize: '12px',
                    margin: '20px auto 0 auto',
                    border: '1px solid #797979',
                    color: '#797979'
                  }}
                  click={() => {}}
                />
              ) : null}
            </div>
          </React.Fragment>
        );
      }

      adminDashboardScreen = (
        <div className={classes.AdminDashboardScreen}>
          <Header />
          <div className={classes.AdminDashboard}>{adminDashboard}</div>
          <Footer />
        </div>
      );
    }

    return adminDashboardScreen;
  }
}

export default AdminDashboard;
