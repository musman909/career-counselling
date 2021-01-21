import React, { Component, createRef } from 'react';

import { withRouter } from 'react-router-dom';

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
import inputTypes from '../../constants/inputTypes';

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

  componentDidMount() {
    setTimeout(() => {
      fetch(
        `/getTestData?data=${JSON.stringify({
          id: this.props.match.params.id
        })}`
      )
        .then((res) =>
          res.json().then((resData) => {
            const selectedTest = {
              id: resData.id,
              name: resData.name,
              data: []
            };

            resData.data.forEach((testData) => {
              if (
                testData.inputType === inputTypes.checkBox ||
                testData.inputType === inputTypes.radio
              ) {
                const options = {};
                testData.options.forEach((option) => {
                  options[option.label] = {
                    isChecked: false,
                    value: option.value
                  };
                });
                selectedTest.data.push({ ...testData, options, value: '' });
              } else if (
                testData.inputType === inputTypes.field ||
                testData.inputType === inputTypes.dropDown
              ) {
                selectedTest.data.push({ ...testData, value: '' });
              }
            });

            console.log(resData);

            this.setState({
              selectedTest,
              activeQuestionNum: 0
              // loading: false
            });
          })
        )
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false, error: true });
        });
    }, 1000);
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

  submitTestHandler = () => {
    let testResponse = {
      id: this.state.selectedTest.id,
      name: this.state.selectedTest.name,
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      data: []
    };
    for (const key in this.state.selectedTest.data) {
      testResponse.data.push({
        question: this.state.selectedTest.data[key].question,
        answer: this.state.selectedTest.data[key].value
      });
    }

    console.log(testResponse);

    // this.props.addTestHandler(testResponse);
    // this.props.history.push('/');
  };

  render() {
    // console.log(this.state.selectedTest);
    let testScreen = <Spinner />;

    if (this.state.loading === false) {
      let test = (
        <div className={classes.TestScreen}>
          <p>something went Wrong!</p>
        </div>
      );

      if (this.state.error === false && this.state.selectedTest !== null) {
        test = (
          <div className={classes.TestScreen}>
            <Heading label="Test" title="Test Screen" />
            <div className={classes.Test}>
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
                        className={classes.Dropdown}
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
          </div>
        );
      }
      testScreen = (
        <div id="TestScreen" className={classes.TestScreenContainer}>
          <Header />
          {test}
          <Footer />
        </div>
      );
    }

    return testScreen;
  }
}

export default withRouter(TestScreen);
