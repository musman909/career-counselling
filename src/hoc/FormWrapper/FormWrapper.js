import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './FormWrapper.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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
          options: ['Education Status:', 'Matric', 'Intermediate', 'Graduate'],
          errorMessage: 'select your status',
          errorStatus: false,
          inputType: 'select',
          inputLabel: 'Current Status:'
        },

        city: {
          value: props.userData ? props.userData['city'] : '',
          options: ['Select City:', ...pakCities],
          errorMessage: 'select your city',
          errorStatus: false,
          inputType: 'select',
          inputLabel: 'City:'
        }
      }
    };
  }

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

  saveProfileDataHandler = async (e) => {
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
      const formData = new FormData();

      for (const key in this.state.userData) {
        if (this.state.userData[key] !== 'cPassword') {
          formData.append(key, this.state.userData[key].value);
        }
      }

      try {
        const res = await this.props.onSubmit(formData);

        if (res.status === 200) {
          this.props.history.push('/login');
        } else {
          this.onStateChangeHandler(
            'email',
            'errorMessage',
            'email already exists!'
          );
          this.onStateChangeHandler('email', 'errorStatus', true);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  render() {
    const transformedUserData = [];
    for (const key in this.state.userData) {
      transformedUserData.push({ ...this.state.userData[key], id: key });
    }

    return (
      <div className={classes.FormWrapper}>
        {this.props.componentName === 'EditProfile' ? <Header /> : null}
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
        {this.props.componentName === 'EditProfile' ? <Footer /> : null}
      </div>
    );
  }
}

export default withRouter(FormWrapper);
