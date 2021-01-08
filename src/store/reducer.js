import * as actionTypes from './actions';
import dummyTest from '../constants/dummyTests';

const initialState = {
  isAuth: false,
  users: {
    'usman@test.com': {
      name: 'Usman',
      password: 'Usman123',
      status: 'Graduate',
      city: 'Lahore',
      tests: [dummyTest, dummyTest, dummyTest]
    },

    'junaid@test.com': {
      name: 'Junaid',
      password: 'Junaid123',
      status: 'Graduate',
      city: 'Lahore'
    },

    'salman@test.com': {
      name: 'Salman',
      password: 'Salman123',
      status: 'Graduate',
      city: 'Lahore'
    }
  },
  activeUser: null,
  userNavLinks: [
    {
      title: 'dashboard',
      link: '/'
    },
    {
      title: 'tests',
      link: '/tests'
    },
    {
      title: 'reviews',
      link: '/reviews'
    },
    {
      title: 'about',
      link: '/about'
    },
    {
      title: 'faq',
      link: '/faq'
    },
    {
      title: 'contact us',
      link: '/contact'
    }
  ],

  homeNavLinks: [
    {
      title: 'home',
      link: '/'
    },
    {
      title: 'about',
      link: '/about'
    },
    {
      title: 'faq',
      link: '/faq'
    },
    {
      title: 'contact us',
      link: '/contact'
    },
    {
      title: 'login',
      link: '/login'
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_AUTH:
      return { ...state, isAuth: action.auth };
    case actionTypes.REGISTER_USER:
      const key = action.userData.email;
      delete action.userData.email;

      return { ...state, users: { ...state.users, [key]: action.userData } };
    case actionTypes.SET_ACTIVE_USER:
      return { ...state, activeUser: action.activeUser };

    case actionTypes.ADD_TEST:
      const currentUserData = { ...state.users[state.activeUser] };
      currentUserData.tests.push(action.test);
      return {
        ...state,
        users: { ...state.users, [state.activeUser]: currentUserData }
      };

    case actionTypes.FETCH_TEST:
      return state;
    default:
      return state;
  }
};

export default reducer;