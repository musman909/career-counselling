import React, { Component } from 'react';

import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';
import Home from './containers/Home/Home';
import Registration from './containers/Registration/Registration';
import Login from './containers/Login/Login';
import Tests from './containers/Tests/Tests';
import EditProfile from './containers/EditProfile/EditProfile';

class App extends Component {
  state = {
    userNavLinks: [
      {
        title: 'tests',
        link: '/'
      },
      {
        title: 'about',
        link: '/'
      },
      {
        title: 'faq',
        link: '/'
      },
      {
        title: 'contact us',
        link: '/'
      }
    ],

    homeNavLinks: [
      {
        title: 'home',
        link: '/'
      },
      {
        title: 'about',
        link: '/'
      },
      {
        title: 'faq',
        link: '/'
      },
      {
        title: 'contact us',
        link: '/'
      },
      {
        title: 'login',
        link: '/'
      }
    ]
  };
  render() {
    return (
      <div className="App">
        {/* <EditProfile navLinks={this.state.userNavLinks} /> */}
        <Tests navLinks={this.state.userNavLinks} />
        {/* <Home navLinks={this.state.homeNavLinks} /> */}
        {/* <Dashboard navLinks={this.state.userNavLinks} /> */}
        {/* <Registration /> */}
        {/* <Login /> */}
      </div>
    );
  }
}

export default App;
