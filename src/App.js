import React, { Component } from 'react';

import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from './store/actions';
import Dashboard from './containers/Dashboard/Dashboard';
import Home from './containers/Home/Home';
import Registration from './containers/Registration/Registration';
import Login from './containers/Login/Login';
import Tests from './containers/Tests/Tests';
import EditProfile from './containers/EditProfile/EditProfile';
import TestResult from './containers/TestResult/TestResult';
import TestScreen from './containers/TestScreen/TestScreen';
import ForgetPassword from './containers/ForgetPassword/ForgetPassword';
import Faq from './containers/Faq/Faq';
import Contact from './containers/Contact/Contact';
import About from './containers/About/About';
import Reviews from './containers/Reviews/Reviews';
import Feedback from './containers/Feedback/Feedback';
import Spinner from './components/Spinner/Spinner';

class App extends Component {
  state = {
    loading: false,
    isAuth: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await axios.post('/api/sessionCheck');
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }
      const resData = response.data;
      console.log(resData);

      if (resData.email) {
        this.props.changeAuthHandler(true);
        this.props.setActiveUserHandler(resData.email);
        console.log('email => ', resData.email);
      } else {
        this.props.changeAuthHandler(false);
        this.props.setActiveUserHandler(null);
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
  }

  render() {
    console.log('App.js render');
    let routes = null;
    if (this.props.isAuth) {
      routes = (
        <React.Fragment>
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/tests" exact component={Tests} />
          <Route path="/tests/:id" component={TestScreen} />
          <Route path="/view-test-result/:id" component={TestResult} />
        </React.Fragment>
      );
    } else {
      routes = <Route path="/login" component={Login} />;
    }

    let app = <Spinner />;

    if (!this.state.loading) {
      app = (
        <div>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (this.props.isAuth ? <Dashboard /> : <Home />)}
            />

            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/faq" component={Faq} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/feedback" component={Feedback} />

            <Route path="/forget-password" component={ForgetPassword} />
            <Route path="/register" component={Registration} />
            {routes}
            <Redirect to="/" />
          </Switch>
        </div>
      );
    }

    return app;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAuthHandler: (auth) =>
      dispatch({ type: actionTypes.CHANGE_AUTH, auth: auth }),

    setActiveUserHandler: (email) =>
      dispatch({
        type: actionTypes.SET_ACTIVE_USER,
        email: email
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
