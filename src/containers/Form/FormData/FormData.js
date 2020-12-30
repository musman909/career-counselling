export const stateData = {
  userData: {
    name: {
      value: '',
      errorMessage: 'name should contains atleast 5 characters',
      errorStatus: false,
      inputType: 'text',
      inputLabel: 'Name:'
    },

    email: {
      value: '',
      errorMessage: 'please enter a valid email address',
      errorStatus: false,
      inputType: 'email',
      inputLabel: 'Email:'
    },

    password: {
      value: '',
      errorMessage:
        'password should have atleast 8 characters [includes A-Z, a-z & digits]',
      errorStatus: false,
      inputType: 'password',
      inputLabel: 'Password:'
    },

    cPassword: {
      value: '',
      errorMessage: '',
      errorStatus: false,
      inputType: 'password',
      inputLabel: 'Confirm Password:'
    },

    status: {
      value: '',
      options: ['', 'Matric', 'Intermediate', 'Graduate'],
      errorMessage: 'select your status',
      errorStatus: false,
      inputType: 'select',
      inputLabel: 'Current Status:'
    },

    city: {
      value: '',
      options: ['', 'Lahore', 'Karachi', 'Islamabad'],
      errorMessage: 'select your city',
      errorStatus: false,
      inputType: 'select',
      inputLabel: 'City:'
    }
  }
};

export const stateChangeHandler = (key, type, value) => {
  this.setState((curState) => ({
    ...curState,
    userData: {
      ...curState.userData,
      [key]: {
        ...curState.userData[key],
        [type]: value
      }
    }
  }));
};

export const validateInputHandler = (type, value) => {
  if (type === 'name' && value.length >= 5) {
    return true;
  }

  if (
    type === 'email' &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    return true;
  }

  if (
    type === 'password' &&
    value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
  ) {
    return true;
  }

  if (type === 'cPassword') {
    return true;
  }

  if (type === 'status' && value) {
    return true;
  }

  if (type === 'city' && value) {
    return true;
  }

  return false;
};

export const formSubmitHandler = (e) => {
  e.preventDefault();
  let error = false;
  if (!this.isValidInputHandler('name', this.state.userData.name.value)) {
    this.onStateChangeHandler('name', 'errorStatus', true);
    error = true;
  }
  if (!this.isValidInputHandler('email', this.state.userData.email.value)) {
    this.onStateChangeHandler('email', 'errorStatus', true);
    error = true;
  }
  if (
    !this.isValidInputHandler('password', this.state.userData.password.value)
  ) {
    this.onStateChangeHandler(
      'password',
      'errorMessage',
      'password should have atleast 8 characters [includes A-Z, a-z & digits]'
    );
    this.onStateChangeHandler('password', 'errorStatus', true);
    error = true;
  }

  if (this.state.userData.cPassword.value === '') {
    this.onStateChangeHandler(
      'cPassword',
      'errorMessage',
      'The field is required'
    );
    this.onStateChangeHandler('cPassword', 'errorStatus', true);
    error = true;
  }

  if (
    this.state.userData.password.value !== this.state.userData.cPassword.value
  ) {
    this.onStateChangeHandler(
      'password',
      'errorMessage',
      'password does not match'
    );
    this.onStateChangeHandler(
      'cPassword',
      'errorMessage',
      'password does not match'
    );
    this.onStateChangeHandler('password', 'errorStatus', true);
    this.onStateChangeHandler('cPassword', 'errorStatus', true);
    error = true;
  }

  if (!this.isValidInputHandler('status', this.state.userData.status.value)) {
    this.onStateChangeHandler('status', 'errorStatus', true);
    error = true;
  }

  if (!this.isValidInputHandler('city', this.state.userData.city.value)) {
    this.onStateChangeHandler('city', 'errorStatus', true);
    error = true;
  }

  if (!error) {
    alert('User is registered');
  }
};
