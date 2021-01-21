import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import classes from './Registration.module.css';
import FormWrapper from '../../hoc/FormWrapper/FormWrapper';

class Registration extends Component {
  render() {
    return (
      <div className={classes.Registration}>
        <FormWrapper
          componentName="Registration"
          onSubmit={this.props.registerUserHandler}
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

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserHandler: (userData) => {
      return fetch(`/register?data=${JSON.stringify(userData)}`)
        .then((res) => res.json().then((data) => data))
        .catch(() => null);
    }
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Registration));
