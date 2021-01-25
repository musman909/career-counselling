import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import classes from './ProfileIcon.module.css';
import profileIcon from '../../assests/images/user.png';

class ProfileIcon extends Component {
  state = {
    showDropDown: false
  };

  toggleDropDownHandler = () => {
    this.setState((prevState) => ({ showDropDown: !prevState.showDropDown }));
  };

  logoutHandler = async () => {
    try {
      await axios.post('/api/logout');
      this.props.changeAuthHandler(false);
      this.props.setActiveUserHandler(null);
    } catch (err) {
      alert(err.message);
    }
  };

  render() {
    const dropDownClasses = [classes.Dropdown];
    if (this.state.showDropDown) {
      dropDownClasses.push(classes.ShowDropDown);
    }
    return (
      <React.Fragment>
        <img
          src={profileIcon}
          alt="Profile"
          className={classes.ProfileIcon}
          onClick={this.toggleDropDownHandler}
        />
        <div className={dropDownClasses.join(' ')}>
          <ul>
            <li>
              <Link to="/edit-profile">Edit Profile</Link>
            </li>
            <li>
              <Link to="/" onClick={this.logoutHandler}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAuthHandler: (auth) =>
      dispatch({ type: actionTypes.CHANGE_AUTH, auth: auth }),

    setActiveUserHandler: (email) =>
      dispatch({
        type: actionTypes.SET_ACTIVE_USER,
        email: email
      })
  };
};

export default connect(null, mapDispatchToProps)(ProfileIcon);
