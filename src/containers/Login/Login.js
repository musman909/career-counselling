import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

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
    } else if (!this.props.users[this.state.userData.email.value]) {
      this.onStateChangeHandler(
        'email',
        'errorMessage',
        'email address does not exists!'
      );
      this.onStateChangeHandler('email', 'errorStatus', true);
      error = true;
    } else if (
      this.props.users[this.state.userData.email.value].password !==
      this.state.userData.password.value
    ) {
      this.onStateChangeHandler(
        'password',
        'errorMessage',
        'password does not match!'
      );
      this.onStateChangeHandler('password', 'errorStatus', true);
      error = true;
    }

    if (!error) {
      this.props.changeAuthHandler(true);
      this.props.setActiveUserHandler(this.state.userData.email.value);
      this.props.history.push('/');
    }
  };

  render() {
    // console.log(this.state.userData.email.value);
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
          <p className={classes.ForgetMsg}>
            <Link to={`${this.props.match.url}/forget-password`}>
              forget password?
            </Link>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAuthHandler: (auth) =>
      dispatch({ type: actionTypes.CHANGE_AUTH, auth: auth }),

    setActiveUserHandler: (email) =>
      dispatch({
        type: actionTypes.SET_ACTIVE_USER,
        activeUser: email
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
