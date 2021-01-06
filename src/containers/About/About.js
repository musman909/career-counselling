import React, { Component } from 'react';

import classes from './About.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import aboutData from '../../constants/faqData';

class About extends Component {
  state = {
    aboutData: null
  };

  componentDidMount() {
    // setTimeout(() => {
    this.setState({ aboutData });
    // }, 2000);
  }

  render() {
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

    if (this.state.aboutData) {
      faq = (
        <React.Fragment>
          <Header />
          <div className={classes.About}>
            <h1>About Us</h1>
            <ul>
              {this.state.aboutData.map((data, index) => (
                <li key={index} className={classes.Question}>
                  <h4>{data.question}</h4>
                  <p>{data.answer}</p>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </React.Fragment>
      );
    }
    return <React.Fragment>{faq}</React.Fragment>;
  }
}

export default About;
