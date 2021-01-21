import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import FormWrapper from '../../hoc/FormWrapper/FormWrapper';
import Heading from '../../components/Heading/Heading';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';

class EditProfile extends Component {
  state = {
    userData: null
  };

  componentDidMount() {
    this.setState({ userData: this.props.userData });
  }

  render() {
    let screen = <Spinner />;
    if (this.state.userData) {
      screen = (
        <FormWrapper componentName="EditProfile" userData={this.state.userData}>
          <Heading label="Edit Profile" title="Edit Your Profile" />
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
