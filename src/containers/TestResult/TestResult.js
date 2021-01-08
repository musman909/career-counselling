import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';

import classes from './TestResult.module.css';
import btnTypes from '../../constants/btnTypes';

class TestResult extends Component {
  state = {
    selectedTest: null
  };

  componentDidMount() {
    this.setState({
      selectedTest: this.props.tests[this.props.match.params.id]
    });
  }

  render() {
    console.log(this.state.selectedTest);
    let testResult = (
      <div
        style={{
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spinner />
      </div>
    );

    if (this.state.selectedTest) {
      testResult = (
        <div className={classes.TestResultScreen}>
          <Header />
          <div className={classes.TestResult}>
            <h1>
              Test Name: <span>{this.state.selectedTest.id}</span>
            </h1>
            <h4>
              Given Date: <span>{this.state.selectedTest.date}</span>
            </h4>
            <ul>
              {this.state.selectedTest.data.map((data, index) => (
                <li key={index}>
                  <p className={classes.Question}>
                    Question: <span>{data.question}</span>
                  </p>
                  <p className={classes.Answer}>
                    Answer: <span>{data.answer}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.BtnsContainers}>
            <Button
              styles={{ margin: '0 20px' }}
              text="Download Result"
              type={btnTypes.Button4}
              click={() => {}}
            />
            <Button
              styles={{ margin: '0 20px' }}
              text="Rate Us"
              type={btnTypes.Button2}
              click={() => {}}
            />
          </div>
          <Footer />
        </div>
      );
    }

    return <React.Fragment>{testResult}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    tests: state.users[state.activeUser].tests
  };
};

export default connect(mapStateToProps, null)(TestResult);
