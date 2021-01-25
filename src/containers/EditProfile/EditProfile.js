import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import classes from './EditProfile.module.css';
import FormWrapper from '../../hoc/FormWrapper/FormWrapper';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';

class EditProfile extends Component {
  state = {
    userData: null
  };

  componentDidMount() {
    this.setState({ userData: this.props.userData });
  }

  editUserProfileHandler = async (userData) => {
    try {
      const response = await axios.post('/api/editUserProfile', userData);
      if (response.status !== 200) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  render() {
    let screen = <Spinner />;
    if (this.state.userData) {
      screen = (
        <div className={classes.EditProfileScreen}>
          <Header />
          <div className={classes.EditProfile}>
            <FormWrapper
              componentName="EditProfile"
              userData={this.state.userData}
              onSubmit={this.editUserProfileHandler}
            >
              <Heading label="Edit Profile" title="Edit Your Profile" />
            </FormWrapper>
          </div>
          <Footer />
        </div>
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
