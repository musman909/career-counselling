import React, { Component } from 'react';

import classes from './FormWrapper.module.css';
import Form from '../../containers/Form/Form';
import pakCities from '../../constants/pakCities';

class FormWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        name: {
          value: props.userData ? props.userData['name'] : '',
          errorMessage: 'name should contains atleast 5 characters',
          errorStatus: false,
          inputType: 'text',
          inputLabel: 'Name:'
        },

        email: {
          value: props.userData ? props.userData['email'] : '',
          errorMessage: 'please enter a valid email address',
          errorStatus: false,
          inputType: 'email',
          inputLabel: 'Email:'
        },

        password: {
          value: props.userData ? props.userData['password'] : '',
          errorMessage:
            'password should have atleast 8 characters [includes A-Z, a-z & digits]',
          errorStatus: false,
          inputType: 'password',
          inputLabel: 'Password:'
        },

        cPassword: {
          value: props.userData ? props.userData['cPassword'] : '',
          errorMessage: '',
          errorStatus: false,
          inputType: 'password',
          inputLabel: 'Confirm Password:'
        },

        status: {
          value: props.userData ? props.userData['status'] : '',
          options: [
            '-- select a value --',
            'Matric',
            'Intermediate',
            'Graduate'
          ],
          errorMessage: 'select your status',
          errorStatus: false,
          inputType: 'select',
          inputLabel: 'Current Status:'
        },

        city: {
          value: props.userData ? props.userData['city'] : '',
          options: ['-- select a value --', ...pakCities],
          errorMessage: 'select your city',
          errorStatus: false,
          inputType: 'select',
          inputLabel: 'City:'
        }
      }
    };
  }

  // componentDidMount() {
  //   if (this.props.componentName === 'EditProfile') {
  //     for (let key in this.props.userData) {
  //       this.onStateChangeHandler(key, 'value', this.props.userData[key]);
  //     }
  //   }
  // }

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
    if (type === 'name' && value.length >= 5) {
      return true;
    }

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
      value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    ) {
      return true;
    }

    if (type === 'cPassword') {
      return true;
    }

    if (type === 'status' && value) {
      return true;
    }

    if (type === 'city' && value) {
      return true;
    }

    return false;
  };

  saveProfileDataHandler = (e) => {
    e.preventDefault();
    let error = false;
    if (!this.isValidInputHandler('name', this.state.userData.name.value)) {
      this.onStateChangeHandler('name', 'errorStatus', true);
      error = true;
    }
    if (!this.isValidInputHandler('email', this.state.userData.email.value)) {
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

    if (this.state.userData.cPassword.value === '') {
      this.onStateChangeHandler(
        'cPassword',
        'errorMessage',
        'The field is required'
      );
      this.onStateChangeHandler('cPassword', 'errorStatus', true);
      error = true;
    }

    if (
      this.state.userData.password.value !== this.state.userData.cPassword.value
    ) {
      this.onStateChangeHandler(
        'password',
        'errorMessage',
        'password does not match'
      );
      this.onStateChangeHandler(
        'cPassword',
        'errorMessage',
        'password does not match'
      );
      this.onStateChangeHandler('password', 'errorStatus', true);
      this.onStateChangeHandler('cPassword', 'errorStatus', true);
      error = true;
    }

    if (!this.isValidInputHandler('status', this.state.userData.status.value)) {
      this.onStateChangeHandler('status', 'errorStatus', true);
      error = true;
    }

    if (!this.isValidInputHandler('city', this.state.userData.city.value)) {
      this.onStateChangeHandler('city', 'errorStatus', true);
      error = true;
    }

    if (!error) {
      const data = {};
      for (const key in this.state.userData) {
        if (data[key] !== 'cPassword') {
          data[key] = this.state.userData[key].value;
        }
      }
      this.props.onSubmit(data);
    }
  };

  render() {
    const transformedUserData = [];
    for (const key in this.state.userData) {
      transformedUserData.push({ ...this.state.userData[key], id: key });
    }

    return (
      <div className={classes.FormWrapper}>
        {this.props.children}
        <Form
          userData={transformedUserData}
          formSubmitHandler={this.saveProfileDataHandler}
          validateInput={this.isValidInputHandler}
          onInputChange={this.onStateChangeHandler}
          submitBtnText={
            this.props.componentName === 'Registration' ? 'Register' : 'Update'
          }
        />
      </div>
    );
  }
}

export default FormWrapper;
