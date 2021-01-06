import React, { Component } from 'react';

import classes from './Contact.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Form from '../Form/Form';

const inputTypes = {
  name: 'name',
  email: 'email',
  message: 'messages'
};

class Contact extends Component {
  state = {
    userData: {
      [inputTypes.name]: {
        value: '',
        errorMessage: 'name should contains atleast 5 characters',
        errorStatus: false,
        inputType: 'text',
        inputLabel: 'Name:'
      },

      [inputTypes.email]: {
        value: '',
        errorMessage: 'please enter a valid email address',
        errorStatus: false,
        inputType: 'email',
        inputLabel: 'Email:'
      },

      [inputTypes.message]: {
        value: '',
        errorMessage: 'message should contains atleast 30 characters',
        errorStatus: false,
        inputType: 'textarea',
        inputLabel: 'Message:'
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
    if (type === inputTypes.name && value.length >= 5) {
      return true;
    }

    if (
      type === inputTypes.email &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      return true;
    }

    if (type === inputTypes.message && value.length >= 30) {
      return true;
    }

    return false;
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    let error = false;
    if (
      !this.isValidInputHandler(inputTypes.name, this.state.userData.name.value)
    ) {
      this.onStateChangeHandler(inputTypes.name, 'errorStatus', true);
      error = true;
    }
    if (
      !this.isValidInputHandler(
        inputTypes.email,
        this.state.userData.email.value
      )
    ) {
      this.onStateChangeHandler(inputTypes.email, 'errorStatus', true);
      error = true;
    }

    if (
      !this.isValidInputHandler(
        inputTypes.message,
        this.state.userData.message.value
      )
    ) {
      this.onStateChangeHandler(inputTypes.message, 'errorStatus', true);
      error = true;
    }

    if (!error) {
    }
  };

  render() {
    const transformedUserData = [];
    for (const key in this.state.userData) {
      transformedUserData.push({ ...this.state.userData[key], id: key });
    }
    return (
      <React.Fragment>
        <Header />
        <div className={classes.Contact}>
          <h1 className={classes.Heading}>Contact Us</h1>
          <Form
            userData={transformedUserData}
            formSubmitHandler={this.sendMessageHandler}
            validateInput={this.isValidInputHandler}
            onInputChange={this.onStateChangeHandler}
            submitBtnText="Send"
          />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Contact;
