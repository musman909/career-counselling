import React, { Component } from 'react';

import classes from './Input.module.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      showError: false
    };
  }

  componentDidUpdate() {
    if (this.props.errorStatus) {
      this.props.onChange(this.props.id, 'errorStatus', false);
      this.setState((curState) => ({
        ...curState,
        showError: true,
        isFocused: true
      }));
    }
  }

  onValueChangeHandler = (e) => {
    const enteredText = e.target.value;
    this.setState((curState) => ({
      ...curState,
      showError: !this.props.validateInput(this.props.id, enteredText)
    }));
  };

  onBlurHandler = (e) => {
    const enteredText = e.target.value;
    if (!this.state.isFocused) {
      this.setState((curState) => ({ ...curState, isFocused: true }));
    }
    this.setState((curState) => ({
      ...curState,
      showError: !this.props.validateInput(this.props.id, enteredText)
    }));
    this.props.onChange(this.props.id, 'value', enteredText);
  };

  // getErrorStatus = (text) => {
  //   return !text || text.length < 5 ? true : false;
  // };

  render() {
    // console.log(this.props);
    return (
      <div className={classes.InputContainer}>
        <label>{this.props.inputLabel}</label>

        <div className={classes.InputWrapper}>
          {this.props.inputType.toLowerCase() === 'select' ? (
            <select
              key={this.props.id}
              onChange={(e) => this.onValueChangeHandler(e)}
              onBlur={(e) => this.onBlurHandler(e)}
            >
              {this.props.options.map((option) => (
                <option key={option.toLowerCase()} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={
                this.state.showError && this.state.isFocused
                  ? classes.RedBorder
                  : null
              }
              type={this.props.inputType}
              accept={this.props.accept}
              onChange={(e) => this.onValueChangeHandler(e)}
              onBlur={(e) => this.onBlurHandler(e)}
            />
          )}
          <p
            className={
              this.state.showError && this.state.isFocused
                ? classes.ShowError
                : null
            }
          >
            {this.props.errorMessage}
          </p>
        </div>
      </div>
    );
  }
}

export default Input;
