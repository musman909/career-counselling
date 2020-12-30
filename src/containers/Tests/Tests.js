import React, { Component } from 'react';

import SwiperCore, { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

import classes from './Tests.module.css';
import './Tests.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

SwiperCore.use([Navigation]);

const inputTypes = {
  field: 'field',
  dropDown: 'dropdown',
  checkBox: 'checkbox',
  radio: 'radio'
};

class Tests extends Component {
  state = {
    tests: [
      {
        id: 1,
        name: 'test1',
        data: [
          {
            question: "What's your current study status?",
            options: ['Matric', 'Intermediate'],
            inputType: inputTypes.dropDown
          },
          {
            question:
              'From follwing, which bachelors degree program, you want to go?',
            options: ['BS(CS)', 'BS(IT)', 'BBA', 'BS (Psychology)'],
            inputType: inputTypes.dropDown
          },
          {
            question: "What's your favourite subjects?",
            inputType: inputTypes.field
          },
          {
            question: 'Current Status',
            inputType: inputTypes.checkBox,
            options: [
              'Student',
              'Freelancer',
              'Internee',
              'Job Holder',
              'Working on your own Projects',
              'Other'
            ]
          },
          {
            question: 'Desired Profession',
            inputType: inputTypes.field
          },

          {
            question: 'What game do you like the most?',
            inputType: inputTypes.checkBox,
            options: [
              'Indoor games',
              'Outdoor games',
              'Video games',
              'None of these'
            ]
          },
          {
            question: 'what kind of hobbies do you have?',
            inputType: inputTypes.checkBox,
            options: [
              'Travel, meet strangers',
              'Volunteering, community service or charity work.',
              'Sports such as competing on a team or in a league, hiking or other exercise.',
              'Creative arts, including writing, music, painting and crafts.',
              'Cooking or gardening.',
              'other'
            ]
          },
          {
            question:
              'Please choose the word that describes you most of the time.',
            inputType: inputTypes.radio,
            options: ['Structured', 'Flexible']
          },

          {
            question:
              'Please choose the word that describes you most of the time.',
            inputType: inputTypes.radio,
            options: ['Feeling', 'Thinking']
          },
          {
            question: 'Are you a person that is more inclined to',
            inputType: inputTypes.radio,
            options: ['Be in Control', 'Be Adaptable']
          },
          {
            question: 'In general, would you describe yourself as more',
            inputType: inputTypes.radio,
            options: ['Appreciative', 'Questioning']
          },
          {
            question: 'Do your coworkers/Fellows consider you to be more',
            inputType: inputTypes.radio,
            options: ['Outgoing', 'Reserved']
          },
          {
            question:
              'Do you consider yourself a person that likes to focus on',
            inputType: inputTypes.radio,
            options: ['What is', 'What Could be']
          },
          {
            question: 'Which role is more natural for you at work',
            inputType: inputTypes.radio,
            options: ['To critique and analyze', 'To compliment and appreciate']
          },

          {
            question:
              'At work you are part of a planning committee. Are you more inspired by',
            inputType: inputTypes.radio,
            options: ['Vision', 'Facts']
          },

          {
            question: 'What is more satisfying at work',
            inputType: inputTypes.radio,
            options: ['Organizing', 'Going with the flow']
          }
        ]
      },
      {
        id: 2,
        name: 'test2',
        data: {}
      },
      {
        id: 3,
        name: 'test3',
        data: {}
      }
    ]
  };
  render() {
    return (
      <div className={classes.Tests}>
        <Header navLinks={this.props.navLinks} isAuth={true} />
        <div className={classes.InputContainer}>
          <label>Choose a test: </label>
          <select>
            {this.state.tests.map((test) => (
              <option key={test.id} value={test.name}>
                {test.name}
              </option>
            ))}
          </select>
        </div>
        <button className={classes.StartBtn}>Start Test</button>
        <div className={classes.TestScreen}>
          <Swiper spaceBetween={0} slidesPerView={1} navigation>
            {this.state.tests[0].data.map((data) => {
              let Cmp = null;
              if (
                data.inputType === inputTypes.checkBox ||
                data.inputType === inputTypes.radio
              ) {
                Cmp = (
                  <div className="QuestionOptions">
                    {data.options.map((option) => (
                      <div key={option} className="QuestionOption">
                        <input type={data.inputType} value={option} />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                );
              } else if (data.inputType === inputTypes.field) {
                Cmp = <input type="text" placeholder="Your answer" />;
              } else if (data.inputType === inputTypes.dropDown) {
                Cmp = (
                  <select className="Dropdown">
                    {data.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              }
              return (
                <SwiperSlide key={Math.random() * Math.random()}>
                  <div className="Question">
                    <h2>{data.question}</h2>
                    {Cmp}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Tests;
