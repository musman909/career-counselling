import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import UserInfo from '../../components/UserInfo/UserInfo';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';

class Dashboard extends Component {
  state = {
    userInfos: null,

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

  componentDidMount() {
    const userInfos = [];

    for (const key in this.props.activeUserData) {
      userInfos.push({ label: key, data: this.props.activeUserData[key] });
    }
    userInfos.push({ label: 'tests', data: 0 });

    this.setState({ userInfos });
  }

  render() {
    let dashboard = (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spinner />
      </div>
    );
    if (this.state.userInfos) {
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

      // if (this.state.userInfos.tests.length > 0) {
      //   testsHistoryTable = (
      //     <table className={classes.TestHistoryTable}>
      //       <thead>
      //         <tr>
      //           <th>Test</th>
      //           <th>Date</th>
      //           <th>Result</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {this.state.userInfos.tests.map((test, index) => (
      //           <tr key={index}>
      //             <td>{test.id}</td>
      //             <td>{test.date}</td>
      //             <td>
      //               <Link to={`/view-result/${index}`}>View Result</Link>
      //             </td>
      //           </tr>
      //         ))}
      //       </tbody>
      //     </table>
      //   );
      // }

      dashboard = (
        <div className={classes.Dashboard}>
          <Header navLinks={this.props.navLinks} isAuth={true} />
          <Banner />
          <div className={classes.UserProfile}>
            <h2>Profile Information</h2>
            <div className={classes.ProfileInfo}>
              {this.state.userInfos.map((info) => (
                <UserInfo
                  key={info.label}
                  label={info.label}
                  data={info.data}
                />
              ))}
            </div>
          </div>
          <div className={classes.Hr}></div>
          <div className={classes.TestHistory}>
            <h2>Test History</h2>
            {testsHistoryTable}
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
