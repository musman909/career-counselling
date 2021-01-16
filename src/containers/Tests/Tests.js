import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

import classes from './Tests.module.css';
import './Tests.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InputsGroup from '../../components/InputsGroup/InputsGroup';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import dummyTest from '../../constants/testData';
import inputTypes from '../../constants/inputTypes';
import testNames from '../../constants/testNames';

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

class Tests extends Component {
  constructor() {
    super();
    this.swiperRef = createRef();
    this.state = {
      selectedTestName: null,
      testIsSelected: false,
      showTest: false,
      loading: false,
      activeQuestionNum: null
    };
  }

  testSelectHandler = (e) => {
    this.setState({
      testIsSelected: true,
      selectedTestName: e.target.value
    });
  };

  showTestHandler = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      const selectedTest = { id: dummyTest.id, data: [] };

      dummyTest.data.forEach((testData) => {
        if (
          testData.inputType === inputTypes.checkBox ||
          testData.inputType === inputTypes.radio
        ) {
          const options = {};
          testData.options.forEach((option) => {
            options[option] = { isChecked: false };
          });
          selectedTest.data.push({ ...testData, options, value: '' });
        } else if (
          testData.inputType === inputTypes.field ||
          testData.inputType === inputTypes.dropDown
        ) {
          selectedTest.data.push({ ...testData, value: '' });
        }
      });

      this.setState({
        selectedTest,
        showTest: true,
        activeQuestionNum: 0,
        loading: false
      });
    }, 3000);
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
        data[index].options[key].isChecked = false;
      }
      data[index].options[e.target.value].isChecked = true;
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

  submitTestHandler = () => {
    let test = {
      id: this.state.selectedTestName,
      date: new Date().toString(),
      data: []
    };
    for (const key in this.state.selectedTest.data) {
      test.data.push({
        question: this.state.selectedTest.data[key].question,
        answer: this.state.selectedTest.data[key].value
      });
    }

    console.log(test);

    this.props.addTestHandler(test);
    this.props.history.push('/');
  };

  render() {
    let test = (
      <div className={classes.InputContainer}>
        <div className={classes.Input}>
          <label>Choose a test: </label>
          <select onChange={this.testSelectHandler}>
            <option className={classes.DropDownMessage}>select a test</option>
            {testNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <Button
          text="Show Test"
          styles={{
            margin: 'auto'
          }}
          type="Btn3"
          click={this.showTestHandler}
          disable={!this.state.testIsSelected || this.state.selectedTest}
        />
      </div>
    );

    if (this.state.loading) {
      test = <Spinner />;
    }

    if (this.state.showTest && !this.state.loading) {
      test = (
        <div className={classes.TestScreen}>
          <Swiper {...params} ref={this.swiperRef}>
            {this.state.selectedTest.data.map((data, index) => {
              let Cmp = null;
              if (
                data.inputType === inputTypes.radio ||
                data.inputType === inputTypes.checkBox
              ) {
                const inputsData = [];
                for (const option in data.options) {
                  inputsData.push({
                    option: option,
                    isChecked: data.options[option].isChecked
                  });
                }
                Cmp = (
                  <InputsGroup
                    inputsData={inputsData}
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
                Cmp = (
                  <select
                    className="Dropdown"
                    value={data.value}
                    onChange={(e) =>
                      this.setUserResponse(e, data.inputType, index)
                    }
                  >
                    <option className={classes.DropDownMessage}>
                      -- select a value --
                    </option>
                    {data.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              }
              return (
                <div className="Question" key={data.question + index}>
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
              type="Btn4"
              click={this.goPrevQuestion}
              disable={this.disabledPrevButton()}
            />
            <Button
              text="Next"
              styles={{
                margin: '0 10px'
              }}
              type="Btn4"
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
            type="Btn3"
            click={this.submitTestHandler}
            disable={this.disableSubmitButton()}
          />
        </div>
      );
    }

    return (
      <div id="TestScreen" className={classes.Tests}>
        <Header />
        <div className={classes.Test}>{test}</div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTestHandler: (test) =>
      dispatch({
        type: actionTypes.ADD_TEST,
        test: test
      })
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Tests));
