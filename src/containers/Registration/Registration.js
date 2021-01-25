import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import classes from './Registration.module.css';
import FormWrapper from '../../hoc/FormWrapper/FormWrapper';

class Registration extends Component {
  registerUserHandler = async (userData) => {
    try {
      const response = await axios.post('/api/register', userData);
      console.log(response);
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  render() {
    return (
      <div className={classes.Registration}>
        <FormWrapper
          componentName="Registration"
          onSubmit={this.registerUserHandler}
        >
          <div className={classes.Heading}>
            <h1>
              Career <span>Consueling</span>
            </h1>
            <p className={classes.Slogan}>Find your destination with us</p>
            <h2>Registration</h2>
          </div>
        </FormWrapper>
      </div>
    );
  }
}

export default withRouter(Registration);
