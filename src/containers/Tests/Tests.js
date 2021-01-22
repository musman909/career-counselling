import React, { Component, createRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import classes from './Tests.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

class Tests extends Component {
  state = {
    selectedTestId: null,
    testIsSelected: false,
    showTest: false,
    loading: true,
    tests: null
  };

  componentDidMount() {
    setTimeout(() => {
      fetch('/api/tests')
        .then((res) =>
          res
            .json()
            .then((data) => this.setState({ tests: data, loading: false }))
        )
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
    }, 1000);
  }

  testSelectHandler = (e) => {
    this.setState({
      testIsSelected: true,
      selectedTestId: e.target.value
    });
  };

  showTestScreenHandler = () => {
    this.props.history.push(`/tests/${this.state.selectedTestId}`);
  };

  render() {
    let tests = <Spinner />;

    if (this.state.loading === false) {
      tests = (
        <div className={classes.Tests}>
          <Header />
          <div className={classes.Test}>
            <div className={classes.InputContainer}>
              <div className={classes.Input}>
                <label>Choose a test: </label>
                <select onChange={this.testSelectHandler}>
                  <option className={classes.DropDownMessage}>
                    select a test
                  </option>
                  {this.state.tests.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                text="Show Test"
                styles={{
                  margin: 'auto'
                }}
                type={btnTypes.Button4}
                click={this.showTestScreenHandler}
                disable={!this.state.testIsSelected}
              />
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return tests;
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTestHandler: (test) =>
//       dispatch({
//         type: actionTypes.ADD_TEST,
//         test: test
//       })
//   };
// };

export default withRouter(Tests);
