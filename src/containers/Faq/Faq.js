import React, { Component } from 'react';

import classes from './Faq.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import faqData from '../../constants/faqData';

class Faq extends Component {
  state = {
    faqData: null
  };

  componentDidMount() {
    // setTimeout(() => {
    this.setState({ faqData });
    // }, 2000);
  }

  render() {
    console.log(this.state.faqData);
    let faq = (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spinner />
      </div>
    );

    if (this.state.faqData) {
      faq = (
        <div className={classes.FaqScreen}>
          <Header />
          <div className={classes.Faq}>
            <h1>Frequently Asked Questions</h1>
            <ul>
              {this.state.faqData.map((data, index) => (
                <li key={index} className={classes.Question}>
                  <h4>{data.question}</h4>
                  <p>{data.answer}</p>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      );
    }
    return <React.Fragment>{faq}</React.Fragment>;
  }
}

export default Faq;
