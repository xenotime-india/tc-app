import { PROFILE } from '../actionTypes';

const initialState = {
  profile: null,
  oidc: null,
  loginStarted: false,
  loginSuccess: false,
  loginError: false,
  logoutStarted: false,
  logoutSuccess: false,
  logoutError: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PROFILE.LOGIN_STARTED: {
      return {
        ...state,
        loginStarted: true,
        loginSuccess: false,
        loginError: false,
      };
    }
    case PROFILE.LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.response,
        loginStarted: false,
        loginSuccess: true,
        loginError: false,
      };
    }
    case PROFILE.LOGIN_ERROR: {
      return {
        ...state,
        loginStarted: false,
        loginSuccess: false,
        loginError: true,
        loginErrorMsg: action.error ? JSON.stringify(action.error) : null,
      };
    }
    case PROFILE.LOGOUT_STARTED: {
      return {
        ...state,
        logoutStarted: true,
        logoutSuccess: false,
        logoutError: false,
      };
    }
    case PROFILE.LOGOUT_SUCCESS: {
      return {
        ...state,
        profile: null,
        oidc: null,
        logoutStarted: false,
        logoutSuccess: true,
        logoutError: false,
      };
    }
    case PROFILE.LOGOUT_ERROR: {
      return {
        ...state,
        logoutStarted: false,
        logoutSuccess: false,
        logoutError: true,
      };
    }
    default:
      return state;
  }
};
