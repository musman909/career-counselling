import React, { Component } from 'react';

import classes from './Faq.module.css';
import Header from '../../components/Header/Header';
import Heading from '../../components/Heading/Heading';
import Footer from '../../components/Footer/Footer';
import faqData from '../../constants/faqData';

class Faq extends Component {
  render() {
    return (
      <div className={classes.FaqScreen}>
        <Header />
        <div className={classes.Faq}>
          <Heading label="f.a.q" title="Frequently Asked Questions" />
          <ul>
            {faqData.map((data, index) => (
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
}

export default Faq;
