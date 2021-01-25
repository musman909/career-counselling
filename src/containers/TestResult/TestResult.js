import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
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
      selectedTest: this.props.selectedTest
    });
  }

  render() {
    console.log(this.state.selectedTest);
    let testResult = <Spinner />;

    if (this.state.selectedTest) {
      testResult = (
        <div className={classes.TestResultScreen}>
          <Header />
          <div className={classes.TestResult}>
            <Heading label="test result" title="test result" />
            <div className={classes.Report}>
              <h4>
                Test Name: <span>{this.state.selectedTest.name}</span>
              </h4>
              <h4>
                Given Date: <span>{this.state.selectedTest.date}</span>
              </h4>
              <ul>
                {this.state.selectedTest.data.map((data, index) => (
                  <li key={index}>
                    <p className={classes.Question}>
                      Qs: <span>{data.question}</span>
                    </p>
                    <p className={classes.Answer}>
                      Ans: <span>{data.answer}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <h1 className={classes.Recommendation}>
                Recommendation: <span>{this.state.selectedTest.result}</span>
              </h1>
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
            </div>
          </div>

          <Footer />
        </div>
      );
    }

    return testResult;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedTest: state.testsData[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, null)(TestResult);
