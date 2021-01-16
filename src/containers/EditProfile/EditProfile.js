import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import FormWrapper from '../../hoc/FormWrapper/FormWrapper';
import Spinner from '../../components/Spinner/Spinner';

class EditProfile extends Component {
  state = {
    userData: null
  };

  componentDidMount() {
    this.setState({ userData: this.props.userData });
  }

  render() {
    let screen = (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spinner />
      </div>
    );
    if (this.state.userData) {
      screen = (
        <FormWrapper componentName="EditProfile" userData={this.state.userData}>
          <Header />;
          <h1
            style={{
              fontSize: '25px',
              color: 'rgb(199, 109, 21)',
              textAlign: 'left',
              marginTop: '40px'
            }}
          >
            Profile Information
          </h1>
        </FormWrapper>
      );
    }
    return screen;
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps, null)(EditProfile);
