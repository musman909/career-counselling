import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import classes from './Input.module.css';

const eye = <FontAwesomeIcon icon={faEye} />;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isFocused: false,
      showError: false
    };
  }

  componentDidMount() {
    this.setState({ inputValue: this.props.value });
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

  togglePasswordVisibility = () => {
    const type = this.props.inputType === 'text' ? 'password' : 'text';
    this.props.onChange(this.props.id, 'inputType', type);
  };

  onValueChangeHandler = (e) => {
    const enteredText = e.target.value;
    this.setState((curState) => ({
      ...curState,
      inputValue: enteredText,
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
      inputValue: enteredText,
      showError: !this.props.validateInput(this.props.id, enteredText)
    }));
    this.props.onChange(this.props.id, 'value', enteredText);
  };

  render() {
    let input = null;
    switch (this.props.inputType.toLowerCase()) {
      case 'select':
        input = (
          <select
            key={this.props.id}
            value={this.state.inputValue.toLowerCase()}
            onChange={(e) => this.onValueChangeHandler(e)}
            onBlur={(e) => this.onBlurHandler(e)}
          >
            {this.props.options.map((option) => {
              if (this.state.inputValue === option.toLowerCase()) {
                return (
                  <option
                    key={option.toLowerCase()}
                    value={option.toLowerCase()}
                  >
                    {option}
                  </option>
                );
              } else {
                return (
                  <option
                    key={option.toLowerCase()}
                    value={option.toLowerCase()}
                  >
                    {option}
                  </option>
                );
              }
            })}
          </select>
        );
        break;
      case 'textarea':
        input = (
          <textarea
            style={{ resize: 'none' }}
            className={
              this.state.showError && this.state.isFocused
                ? classes.RedBorder
                : null
            }
            value={this.state.inputValue}
            placeholder={this.props.inputLabel}
            resize="none"
            type={this.props.inputType}
            accept={this.props.accept}
            onChange={(e) => this.onValueChangeHandler(e)}
            onBlur={(e) => this.onBlurHandler(e)}
          />
        );
        break;
      default:
        input = (
          <input
            className={
              this.state.showError && this.state.isFocused
                ? classes.RedBorder
                : null
            }
            value={this.state.inputValue}
            placeholder={this.props.inputLabel}
            type={this.props.inputType}
            accept={this.props.accept}
            onChange={(e) => this.onValueChangeHandler(e)}
            onBlur={(e) => this.onBlurHandler(e)}
          />
        );
        break;
    }
    return (
      <div className={classes.InputContainer}>
        {/* <label style={{ ...this.props.inputLabelStyles }}>
          {this.props.inputLabel}
        </label> */}

        <div className={classes.InputWrapper}>
          {input}
          {this.props.id === 'password' || this.props.id === 'cPassword' ? (
            <i onClick={this.togglePasswordVisibility}>{eye}</i>
          ) : null}
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
