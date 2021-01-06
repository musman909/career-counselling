import React, { Component } from 'react';

import classes from './ForgetPassword.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

class ForgetPassword extends Component {
  state = {
    userData: {
      email: {
        value: '',
        errorMessage: 'enter a valid email address',
        errorStatus: false,
        inputType: 'email',
        inputLabel: 'Enter your email address:'
      }
    }
  };

  onStateChangeHandler = (key, type, value) => {
    console.log(key, type, value);
    this.setState((curState) => ({
      ...curState,
      userData: {
        ...curState.userData,
        [key]: {
          ...curState.userData[key],
          [type]: value
        }
      }
    }));
  };

  isValidInputHandler = (type, value) => {
    if (
      type === 'email' &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      return true;
    }

    return false;
  };

  validateUserHandler = (e) => {
    e.preventDefault();
    let error = false;

    if (!this.isValidInputHandler('email', this.state.userData.email.value)) {
      this.onStateChangeHandler(
        'email',
        'errorMessage',
        'enter a valid email address'
      );
      this.onStateChangeHandler('email', 'errorStatus', true);
      error = true;
    }

    if (!error) {
      alert('User Authenticated');
    }
  };

  render() {
    const transformedUserData = [];
    for (const key in this.state.userData) {
      transformedUserData.push({ ...this.state.userData[key], id: key });
    }

    return (
      <div className={classes.ForgetPassword}>
        <form className={classes.Form}>
          {transformedUserData.map((data) => (
            <Input
              key={data.id}
              {...data}
              inputLabelStyles={{
                color: 'black',
                fontSize: '14px',
                textTransform: 'initial'
              }}
              //   inputStyles={{
              //     border: '1px solid #eee',
              //     padding: '5px 2px'
              //   }}
              onChange={this.onStateChangeHandler}
              validateInput={this.isValidInputHandler}
            />
          ))}
          <Button
            styles={{ margin: 'auto' }}
            text="Submit"
            type={btnTypes.Button4}
            click={this.validateUserHandler}
            // disable={
            //   this.state.userData.email.value === '' ||
            //   this.state.userData.email.errorStatus
            // }
          />
        </form>
      </div>
    );
  }
}

export default ForgetPassword;
