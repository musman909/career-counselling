import React, { Component } from 'react';

import classes from './ProfileIcon.module.css';
import profileIcon from '../../assests/images/profile-icon.jpg';

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
          alt=""
          className={classes.ProfileIcon}
          onClick={this.toggleDropDownHandler}
        />
        <div className={dropDownClasses.join(' ')}>
          <ul>
            <li>
              <a href="/">Edit Profile</a>
            </li>
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileIcon;
