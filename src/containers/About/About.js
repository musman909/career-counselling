import React, { Component } from 'react';

import classes from './About.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import aboutData from '../../constants/faqData';

class About extends Component {
  render() {
    return (
      <div className={classes.AboutScreen}>
        <Header />
        <div className={classes.About}>
          <h1>About Us</h1>
          <ul>
            {aboutData.map((data, index) => (
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

export default About;
