import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import logo from '../../assests/images/logo.jpeg';
import FormWrapper from '../../hoc/FormWrapper/FormWrapper';

class Registration extends Component {
  render() {
    return (
      <FormWrapper
        componentName="Registration"
        onSubmit={this.props.registerUserHandler}
      >
        <img
          src={logo}
          alt="career consuelling logo"
          style={{ display: 'block', width: '200px', height: '150px' }}
        />
        ;
      </FormWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserHandler: (userData) => {
      fetch(`/register?data=${JSON.stringify(userData)}`)
        .then(() => (window.location.href = '/login'))
        .catch((err) => alert(err));
      // dispatch({ type: actionTypes.REGISTER_USER, userData: userData });
    }
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Registration));
