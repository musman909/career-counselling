import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';

import classes from './Login.module.css';

import * as actionTypes from '../../store/actions';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import btnTypes from '../../constants/btnTypes';
import userTypes from '../../constants/userTypes';

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
        errorMessage:
          'password should have atleast 8 characters [includes A-Z, a-z & digits]',
        errorStatus: false,
        inputType: 'password',
        inputLabel: 'Password:'
      },

      user: {
        value: 'student',
        options: ['Login as:', ...Object.values(userTypes)],
        errorMessage: 'select a type',
        errorStatus: false,
        inputType: 'select',
        inputLabel: 'Current Status:'
      }
    },
    userRecord: null
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

    if (
      type === 'password' &&
      value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
    ) {
      return true;
    }

    if (type === 'user' && value) {
      return true;
    }

    return false;
  };

  validateUserHandler = async (e) => {
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

    if (
      !this.isValidInputHandler('password', this.state.userData.password.value)
    ) {
      this.onStateChangeHandler(
        'password',
        'errorMessage',
        'password should have atleast 8 characters [includes A-Z, a-z & digits]'
      );
      this.onStateChangeHandler('password', 'errorStatus', true);
      error = true;
    }

    if (!this.isValidInputHandler('user', this.state.userData.user.value)) {
      this.onStateChangeHandler('user', 'errorStatus', true);
      error = true;
    }

    if (!error) {
      const formData = new FormData();
      formData.append('email', this.state.userData.email.value);
      formData.append('password', this.state.userData.password.value);
      formData.append('user', this.state.userData.user.value);

      try {
        const response = await axios.post('/api/login', formData);

        if (response.status !== 200) {
          throw new Error('Something went wrong!');
        }

        const resData = response.data;
        if (resData.error) {
          this.onStateChangeHandler(
            resData.input,
            'errorMessage',
            resData.message
          );
          this.onStateChangeHandler(resData.input, 'errorStatus', true);
          error = true;
        } else {
          this.props.changeAuthHandler(true);
          this.props.setActiveUserHandler(
            resData.email,
            this.state.userData.user.value
          );
          this.props.history.push('/');
        }
      } catch (err) {
        // alert(err.message);
        console.log(err);
      }
    }
  };

  render() {
    const transformedUserData = [];
    for (const key in this.state.userData) {
      transformedUserData.push({ ...this.state.userData[key], id: key });
    }

    return (
      <div className={classes.Login}>
        <div className={classes.FormWrapper}>
          <div className={classes.Heading}>
            <h1>
              Career <span>Consueling</span>
            </h1>

            <p className={classes.Slogan}>Find your destination with us</p>
            <h2>LogIn</h2>
          </div>
          <form className={classes.Form}>
            {transformedUserData.map((data) => (
              <Input
                key={data.id}
                {...data}
                onChange={this.onStateChangeHandler}
                validateInput={this.isValidInputHandler}
              />
            ))}
            <p className={classes.ForgetMsg}>
              <Link to={'/forget-password'}>forget password?</Link>
            </p>
            <div className={classes.BtnsContainer}>
              <Button
                text="Login"
                type={btnTypes.Button4}
                click={this.validateUserHandler}
              />
              <Button
                text="Cancel"
                type={btnTypes.Button2}
                click={() => {
                  this.props.history.push('/');
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAuthHandler: (auth) =>
      dispatch({ type: actionTypes.CHANGE_AUTH, auth: auth }),

    setActiveUserHandler: (userEmail, userType) =>
      dispatch({
        type: actionTypes.SET_ACTIVE_USER,
        userEmail,
        userType
      })
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
