import {
  SET_LOGGED_IN,
  SET_ACCOUNT_TYPE,
  SET_ACTIVATED_ROUTE,
  SET_NEW_CRUMB,
  SET_URL_MATCH_FOUND
} from './constants';

export const setLoggedIn = isLoggedIn => {
  return {
    type: SET_LOGGED_IN,
    payload: isLoggedIn
  };
};

export const setAccountType = accType => {
  return {
    type: SET_ACCOUNT_TYPE,
    payload: accType
  };
};
export const setActivatedRoute = route => {
  return {
    type: SET_ACTIVATED_ROUTE,
    payload: route
  };
};
export const setNewCrumb = ({ key, value }) => {
  return {
    type: SET_NEW_CRUMB,
    key,
    value
  };
};
export const setUrlMatchFound = val => {
  return {
    type: SET_URL_MATCH_FOUND,
    payload: val
  };
};
