import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './ProfileIcon.module.css';
import profileIcon from '../../assests/images/user.png';

class ProfileIcon extends Component {
  state = {
    showDropDown: false
  };
  toggleDropDownHandler = () => {
    this.setState((prevState) => ({ showDropDown: !prevState.showDropDown }));
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
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileIcon;
