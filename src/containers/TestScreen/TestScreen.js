import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

import classes from './TestScreen.module.css';
import './TestScreen.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
import InputsGroup from '../../components/InputsGroup/InputsGroup';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import inputTypes from '../../constants/inputTypes';
import btnTypes from '../../constants/btnTypes';

// Params definition
const params = {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    clickable: false
  },
  navigation: {
    nextEl: '.swiper-next-btn',
    prevEl: '.swiper-prev-btn'
  },
  spaceBetween: 0,
  allowTouchMove: false
};

const names = [
  'PubSpeak',
  'WorkLong',
  'SelfLearn',
  'ExtraCourse',
  'TalentTest',
  'Olympiad',
  'ReadingWriting',
  'CapScore',
  'Job',
  'TakenInput',
  'Games',
  'Realationship',
  'Behaviour',
  'Management',
  'HardWorker',
  'WorkedInTeam',
  'Introvert'
];

class TestScreen extends Component {
  constructor() {
    super();
    this.swiperRef = createRef();
    this.state = {
      selectedTest: null,
      loading: true,
      error: false,
      activeQuestionNum: null
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('id', this.props.match.params.id);

    try {
      const response = await axios.post('/api/getTestData', formData);
      if (response.status !== 200) {
        throw new Error('Something went wrong while fetching tests data');
      }

      const inputData = response.data.data.input;
      const selectedTest = {
        id: response.data.id,
        name: response.data.name,
        outputOptions: response.data.data.output,
        data: []
      };

      inputData.forEach((input) => {
        if (
          input.inputType === inputTypes.checkBox ||
          input.inputType === inputTypes.radio ||
          input.inputType === inputTypes.dropDown
        ) {
          const options = {};
          input.options.forEach((option) => {
            options[option.label] = {
              value: option.value
            };
            if (
              input.inputType === inputTypes.checkBox ||
              input.inputType === inputTypes.radio
            ) {
              options[option.label]['isChecked'] = false;
            }
          });
          selectedTest.data.push({ ...input, options, value: '' });
        } else if (input.inputType === inputTypes.field) {
          selectedTest.data.push({ ...input, value: '' });
        }
      });

      this.setState({
        selectedTest,
        activeQuestionNum: 0,
        loading: false
      });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  disabledPrevButton = () => {
    return (
      this.state.selectedTest === null ||
      this.state.activeQuestionNum === null ||
      this.state.activeQuestionNum <= 0
    );
  };

  disableNextButton = () => {
    return (
      this.state.selectedTest === null ||
      this.state.activeQuestionNum === null ||
      !this.state.selectedTest.data[this.state.activeQuestionNum].value ||
      this.state.activeQuestionNum >= this.state.selectedTest.data.length - 1
    );
  };

  disableSubmitButton = () => {
    return this.state.selectedTest.data.some(
      (testData) => testData.value === ''
    );
  };

  goPrevQuestion = () => {
    if (this.swiperRef.current && this.swiperRef.current.swiper) {
      this.swiperRef.current.swiper.slidePrev();
      this.setState((curState) => ({
        activeQuestionNum: curState.activeQuestionNum - 1
      }));
    }
  };
  goNextQuestion = () => {
    if (this.swiperRef.current && this.swiperRef.current.swiper) {
      this.swiperRef.current.swiper.slideNext();
      this.setState((curState) => ({
        activeQuestionNum: curState.activeQuestionNum + 1
      }));
    }
  };

  setUserResponse = (e, type, index) => {
    let data = null;
    if (type === inputTypes.checkBox) {
      data = [...this.state.selectedTest.data];
      let val = data[index].value;
      if (e.target.checked) {
        val = val === '' ? `${e.target.value}` : `${val}&${e.target.value}`;
      } else {
        const optArr = val.split('&');
        val = optArr.filter((opt) => opt !== e.target.value).join('&');
      }

      data[index].value = val;
      for (const key in data[index].options) {
        if (val.includes(key)) {
          data[index].options[key].isChecked = true;
        } else {
          data[index].options[key].isChecked = false;
        }
      }
    } else if (type === inputTypes.radio) {
      data = [...this.state.selectedTest.data];
      data[index].value = e.target.value;
      for (const key in data[index].options) {
        if (key === e.target.value) {
          data[index].options[key].isChecked = true;
        } else {
          data[index].options[key].isChecked = false;
        }
      }
    } else if (type === inputTypes.field || type === inputTypes.dropDown) {
      data = [...this.state.selectedTest.data];
      data[index].value = e.target.value;
    }
    this.setState((curState) => ({
      ...curState,
      selectedTest: {
        ...curState.selectedTest,
        data
      }
    }));
  };

  submitTestHandler = async () => {
    const responseValues = [];
    const testResponseData = {
      name: this.state.selectedTest.name,
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      data: [],
      result: null
    };

    for (const key in this.state.selectedTest.data) {
      const question = this.state.selectedTest.data[key].question;
      const answer = this.state.selectedTest.data[key].value.toString();
      const value = this.state.selectedTest.data[key].options[answer].value;
      testResponseData.data.push({ question, answer });
      responseValues.push(value);
    }

    const formData = new FormData();

    responseValues.forEach((value, index) => {
      formData.append(names[index], value);
    });

    try {
      this.setState({ loading: true });
      let response = await axios.post('/model/getPredict', formData);

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      const outputOption = this.state.selectedTest.outputOptions.find(
        (opt) => opt.value === response.data
      );

      testResponseData.result = outputOption.label;

      response = await this.saveTestResponseHandler(
        this.props.activeUserEmail,
        testResponseData.name,
        JSON.stringify(testResponseData.data),
        testResponseData.result,
        testResponseData.date
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });

    // this.props.addTestHandler(testResult);
    // this.props.history.push('/');
  };

  saveTestResponseHandler = (
    userEmail,
    testName,
    testData,
    testResult,
    testDate
  ) => {
    const formData = new FormData();
    formData.append('useremail', userEmail);
    formData.append('testname', testName);
    formData.append('testdata', testData);
    formData.append('testresult', testResult);
    formData.append('testdate', testDate);

    return axios.post('/api/saveUserTestData', formData);
  };

  render() {
    let testScreen = <Spinner />;

    if (!this.state.loading) {
      let test = null;

      if (this.state.error) {
        test = <ErrorMessage error={this.state.error} />;
      } else {
        test = (
          <React.Fragment>
            <Heading label="Test Screen" title={this.state.selectedTest.name} />
            <div className={classes.Test}>
              <Swiper {...params} ref={this.swiperRef}>
                {this.state.selectedTest.data.map((data, index) => {
                  let Cmp = null;
                  if (
                    data.inputType === inputTypes.radio ||
                    data.inputType === inputTypes.checkBox
                  ) {
                    const inputOptions = [];
                    for (const key in data.options) {
                      inputOptions.push({
                        label: key,
                        value: data.options[key].value,
                        isChecked: data.options[key].isChecked
                      });
                    }
                    Cmp = (
                      <InputsGroup
                        inputOptions={inputOptions}
                        type={data.inputType}
                        name={data.question}
                        onChangeHandler={(e) =>
                          this.setUserResponse(e, data.inputType, index)
                        }
                      />
                    );
                  } else if (data.inputType === inputTypes.field) {
                    Cmp = (
                      <input
                        type="text"
                        placeholder="Your answer"
                        value={data.value}
                        onChange={(e) =>
                          this.setUserResponse(e, data.inputType, index)
                        }
                      />
                    );
                  } else if (data.inputType === inputTypes.dropDown) {
                    const dropDownOptions = [];
                    for (const key in data.options) {
                      dropDownOptions.push({
                        label: key,
                        value: data.options[key].value
                      });
                    }
                    Cmp = (
                      <select
                        className={classes.Dropdown}
                        value={data.value}
                        onChange={(e) =>
                          this.setUserResponse(e, data.inputType, index)
                        }
                      >
                        <option className={classes.DropDownMessage}>
                          -- select a value --
                        </option>
                        {dropDownOptions.map((option) => (
                          <option key={option.label} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    );
                  }
                  return (
                    <div className={classes.Question} key={index}>
                      <h2>{data.question}</h2>
                      {Cmp}
                    </div>
                  );
                })}
              </Swiper>
              <div className={classes.BtnsContainer}>
                <Button
                  text="Previous"
                  styles={{
                    margin: '0 10px'
                  }}
                  type={btnTypes.Button4}
                  click={this.goPrevQuestion}
                  disable={this.disabledPrevButton()}
                />
                <Button
                  text="Next"
                  styles={{
                    margin: '0 10px'
                  }}
                  type={btnTypes.Button4}
                  click={this.goNextQuestion}
                  disable={this.disableNextButton()}
                />
              </div>
              <Button
                text="Submit"
                styles={{
                  width: '80%',
                  margin: '70px auto 20px auto'
                }}
                type={btnTypes.Button4}
                click={this.submitTestHandler}
                disable={this.disableSubmitButton()}
              />
            </div>
          </React.Fragment>
        );
      }

      testScreen = (
        <div id="TestScreen" className={classes.TestScreenContainer}>
          <Header />
          <div className={classes.TestScreen}>{test}</div>

          <Footer />
        </div>
      );
    }

    return testScreen;
  }
}

const mapStateToProps = (state) => {
  return {
    activeUserEmail: state.activeUser,
    activeUserData: state.userData
  };
};

export default connect(mapStateToProps, null)(withRouter(TestScreen));
