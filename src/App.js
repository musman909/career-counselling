import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';
import Home from './containers/Home/Home';
import Registration from './containers/Registration/Registration';
import Login from './containers/Login/Login';
import Tests from './containers/Tests/Tests';
import EditProfile from './containers/EditProfile/EditProfile';
import TestResult from './containers/TestResult/TestResult';
import ForgetPassword from './containers/ForgetPassword/ForgetPassword';
import Faq from './containers/Faq/Faq';
import Contact from './containers/Contact/Contact';
import About from './containers/About/About';

class App extends Component {
  render() {
    let userRoutes = null;
    if (this.props.isAuth) {
      userRoutes = (
        <React.Fragment>
          <Route path="/tests" component={Tests} />

          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/view-result/:id" component={TestResult} />
        </React.Fragment>
      );
    }
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (this.props.isAuth ? <Dashboard /> : <Home />)}
          />
          <Route path="/contact" exact component={Contact} />
          <Route path="/about" exact component={About} />
          <Route path="/faq" exact component={Faq} />

          <Route path="/login/forget-password" component={ForgetPassword} />
          <Route path="/register" component={Registration} />
          <Route path="/login" exact component={Login} />
          {userRoutes}
          <Route render={() => <h1>Page Not Found!</h1>} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps, null)(App);
