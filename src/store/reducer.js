import * as actionTypes from './actions';
// import dummyTest from '../constants/dummyTests';

const initialState = {
  isAuth: false,
  activeUser: null,
  userData: null,
  testsData: null,
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
      title: 'reviews',
      link: '/reviews'
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

    case actionTypes.SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.email
      };
    case actionTypes.SET_PROFILE_DATA:
      return {
        ...state,
        userData: action.userData
      };

    case actionTypes.SET_TESTS_DATA:
      return {
        ...state,
        testsData: action.testsData
      };

    default:
      return state;
  }
};

export default reducer;
