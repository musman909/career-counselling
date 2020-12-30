import React, { Component } from 'react';

import classes from './Login.module.css';
import logo from '../../assests/images/logo.jpeg';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';

class Login extends Component {
  state = {
    userData: {
      email: {
        value: '',
        errorMessage: 'enter a valid email address',
        errorStatus: false,
        inputType: 'email',
        inputLabel: 'Email:'
      },

      password: {
        value: '',
        errorMessage: 'password is incorrect',
        errorStatus: false,
        inputType: 'password',
        inputLabel: 'Password:'
      }
    }
  };

  onStateChangeHandler = (key, type, value) => {
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

    if (type === 'password') {
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
      <div className={classes.Login}>
        <img
          className={classes.Logo}
          src={logo}
          alt="career consuelling logo"
        />

        <form className={classes.Form}>
          {transformedUserData.map((data) => (
            <Input
              key={data.id}
              {...data}
              onChange={this.onStateChangeHandler}
              validateInput={this.isValidInputHandler}
            />
          ))}

          <div className={classes.BtnsContainer}>
            <Button
              text="Login"
              type={btnTypes.submit}
              click={this.validateUserHandler}
            />
            <Button text="Cancel" type={btnTypes.cancel} click={() => {}} />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
