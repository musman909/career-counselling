import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import classes from './Tests.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import btnTypes from '../../constants/btnTypes';

class Tests extends Component {
  state = {
    selectedTestId: null,
    testIsSelected: false,
    tests: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await axios.post('/api/tests');

      if (response.status !== 200) {
        throw new Error('Something went wrong while fetching tests data');
      }

      this.setState({ tests: response.data, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
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
    let testsScreen = <Spinner />;

    if (!this.state.loading) {
      let tests = null;
      if (this.state.error) {
        tests = <ErrorMessage error={this.state.error} />;
      } else {
        tests = (
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
        );
      }

      testsScreen = (
        <div className={classes.TestsScreen}>
          <Header />
          <div className={classes.Tests}>{tests}</div>
          <Footer />
        </div>
      );
    }

    return testsScreen;
  }
}

export default withRouter(Tests);
